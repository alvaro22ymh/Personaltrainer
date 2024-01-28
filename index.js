import  express,{json}  from "express";
import cors from "cors";
import { config as dotenvConfig } from 'dotenv';
import authRoutes from './routes/auth.js'
import userRoutes from "./routes/user.js";
import CreateDbConnection from "./config/connectionDb.js";
import routineRoutes from "./routes/routines.js";

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

    

    app.use(cors());
    app.use('/api/auth', authRoutes)
    app.use('/api/user',userRoutes)
    app.use('/api/routines',routineRoutes)


    
    
    

