import  express,{json}  from "express";
import cors from "cors";
import { config as dotenvConfig } from 'dotenv';
import authRoutes from './routes/auth.js'
import {googleGetForUser, registerRoute, userRoutes} from "./routes/user.js";
import CreateDbConnection from "./config/connectionDb.js";
import routineRoutes from "./routes/routines.js";
import { verityJWT } from "./middlewares/verifyJWT.js";
import cookieParser from "cookie-parser"
import refreshRoutes from "./routes/refresh.js";
import logoutRoutes from "./routes/logout.js";
import recoverRoutes from "./routes/recoverPwd.js";
import CreateAccountTokenRoutes from "./routes/createAccountToken.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from "./models/user.js";

import passport from 'passport';

import session from 'express-session';

//d

// Load environment variables from .env file
dotenvConfig();

     

        const app = express()
        app.use(json())
        const port = process.env.PORT
        export const dbConnection = await CreateDbConnection()

        app.use(cors({
            origin: 'http://localhost:3000', // El dominio del cliente
            credentials: true // Permitir cookies de origen cruzado
          }));
          

    
          app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: true }
          }))
          app.use(passport.initialize());

        
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
              const googleId=profile.id

              const user = {
                name: name,
                email: email,
                userRole: userRolId,
                googleId: googleId
              }

              return cb(null,user)  
              
              
            } catch (error) {
                return cb(error,null);
            }

        }
        ));


        app.use(passport.authenticate('session'));

            passport.serializeUser(function(user, done) {
                done(null, user.user_id); // Almacenar el ID del usuario en la sesión
            });

            passport.deserializeUser(async function(id, done) {
              try {
                 const user = await UserModel.findById(id);
                 done(null, user)
              } catch (error) {
                done(error,false)
              }
             
            });
          

        app.listen(process.env.PORT, (err) => {
            if (err) {
                console.error('Error starting the server:', err);
            } else {
                console.log('Server is listening on http://localhost:' + process.env.PORT);
            }
        });
    

    //middleware for cookie
    app.use(cookieParser())


    
    app.use('/api/refresh',refreshRoutes)
    app.use('/api/auth', authRoutes)
    app.use('/api/logout',logoutRoutes)
    app.use('/api/recoverPwd',recoverRoutes)
    app.use('/api/register',registerRoute)
    app.use('/api/userGoogle',googleGetForUser)
    app.use('/api/registerToken',CreateAccountTokenRoutes)
    
    app.use(verityJWT)
    app.use('/api/user',userRoutes)
    app.use('/api/routines',routineRoutes)


    
    
    

