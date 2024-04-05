import { Router } from "express";
import { loginController } from "../controller/auth.js";
import { Validator } from "../middlewares/validation.js";
import { emailExist } from "../helpers/dbValidators.js";
import {body} from 'express-validator';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from "../models/user.js";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
            
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/google/callback",
            scope:['profile','email']
        },
        async function(accessToken, refreshToken, profile, cb) {


            
            try {
                const name = profile.displayName
                const email = profile.emails[0].value;
                const userRolId = [2000]
                const user = await UserModel.findOrCreate({googleId:profile.id, email:email,name:name,uerRole:userRolId})
   
                return cb(null,user)
            } catch (error) {
                return cb(error,null);
            }

        }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user.user_id); // Almacenar el ID del usuario en la sesión
        });
      
        passport.deserializeUser(function(id, done) {
            UserModel.findById(id, function(err, user) {
            done(err, user); // Recuperar el usuario a partir del ID almacenado en la sesión
            });
        });
    


    const authRoutes = new Router()

    authRoutes.post("/login",[
        body('email').custom(emailExist),
        Validator,
      
    ],loginController)


    //GOOGLE AUTH

    authRoutes.get('/google',
    passport.authenticate('google', { scope: ['profile','email'] }));




    authRoutes.get('/google/callback', function(req, res, next) {
            passport.authenticate('google', { failureRedirect: '/login' },async function(err, user, info, status) {

                // console.log(user);
                const email = user['email']
                console.log(email);
                const userRolId=[2000]
                // create jwt
            const accessToken = jwt.sign(
                { "userInfo":{
                "email": email ,
                "roles": userRolId
                }
                },
                process.env.ACCESS_TOKEN_SECRET_KEY,
                {expiresIn: '1m'}
            )

            const refreshToken = jwt.sign(
                {"email": email },
                process.env.REFRESH_TOKEN_SECRET_KEY,
                {expiresIn: '1h'}
            )

            const input = {refreshToken,email}
            await UserModel.insertToken({input})

           
            res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})


                // enviar jwt
                res.redirect('http://localhost:3000/redirect');

            })(req, res, next)
        })
        


    export default authRoutes

