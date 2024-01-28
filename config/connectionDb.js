import mysql from 'mysql2/promise'
import {config} from './config.js'



          const CreateDbConnection = async()=>{
           
           try {
             const dbConnection = await mysql.createConnection(config)
             await dbConnection.connect();
             console.log('Connected to the database.');
             return dbConnection
           } catch (err) {
             console.error('Error connecting to the database:', err.message);
             throw err
           }
         
        
        }
       
         export default CreateDbConnection
