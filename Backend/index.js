import  express,{json}  from "express";
import cors from "cors";
import { config as dotenvConfig } from 'dotenv';
import authRoutes from './routes/auth.js'
import userRoutes from "./routes/user.js";
import CreateDbConnection from "./config/connectionDb.js";
import routineRoutes from "./routes/routines.js";
import { verityJWT } from "./middlewares/verifyJWT.js";
import cookieParser from "cookie-parser"
import refreshRoutes from "./routes/refresh.js";
import logoutRoutes from "./routes/logout.js";
import recoverRoutes from "./routes/recoverPwd.js";


//d

// Load environment variables from .env file
dotenvConfig();

     

        const app = express()
        app.use(json())
        const port = process.env.PORT
        export const dbConnection = await CreateDbConnection()



        app.listen(process.env.PORT, (err) => {
            if (err) {
                console.error('Error starting the server:', err);
            } else {
                console.log('Server is listening on http://localhost:' + process.env.PORT);
            }
        });
    

    //middleware for cookie
    app.use(cookieParser())


    app.use(cors());
    
    app.use('/api/auth', authRoutes)
    app.use('/api/refresh',refreshRoutes)
    app.use('/api/logout',logoutRoutes)
    app.use('/api/recoverPwd',recoverRoutes)
    // app.use(verityJWT)
    app.use('/api/user',userRoutes)
    app.use('/api/routines',routineRoutes)


    
    
    

