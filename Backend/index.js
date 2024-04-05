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


     
          app.use(passport.session())
          
        

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


    
    
    

