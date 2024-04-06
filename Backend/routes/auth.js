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

  

        // passport.serializeUser(function(user, cb) {
        //     process.nextTick(function() {
        //       cb(null, { id: user.user_id, username: user.username, email: user.email, name: user.name, googleId: user.googleId });
        //     });
        //   })
      
        //   passport.deserializeUser(function(user, cb) {
        //     process.nextTick(function() {
        //       return cb(null, user);
        //     });
        //   });

        

    


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

              
                console.log(user);
                

              await UserModel.findOrCreate({googleId:user.googleId, email:user.email,name:user.name,userRole:user.userRole})


                const userRolId=[2000]
                // create jwt
            const accessToken = jwt.sign(
                { "userInfo":{
                "email": user.email ,
                "roles": userRolId
                }
                },
                process.env.ACCESS_TOKEN_SECRET_KEY,
                {expiresIn: '1m'}
            )

            const refreshToken = jwt.sign(
                {"email": user.email },
                process.env.REFRESH_TOKEN_SECRET_KEY,
                {expiresIn: '1h'}
            )
            console.log('refresToken created: '+refreshToken);
            
            const input = {refreshToken,email:user.email}
            const tokenInsertion = await UserModel.insertToken({input})

                res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000})
                // enviar jwt
                res.redirect('http://localhost:3000/redirect');

            })(req, res, next)
        })
        


    export default authRoutes

