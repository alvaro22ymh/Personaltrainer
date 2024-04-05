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

    export default authRoutes

