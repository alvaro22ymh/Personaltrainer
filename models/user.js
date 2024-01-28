
import { dbConnection } from '../index.js';



export class UserModel {


    static async create({input}){
        const {username,email,hashedPassword} = input;

        const lowerCaseUsername = username.toLowerCase()
        console.log(hashedPassword)
        try {
            await dbConnection.query('INSERT INTO user (username,email,password) VALUES (?,?,?)',[lowerCaseUsername, email,hashedPassword])
            
        } catch (error) {
            throw new Error("FAILED TO CREATE USER: "+error) 
        }
        const [data] = await dbConnection.query('SELECT * FROM user WHERE username=?',[lowerCaseUsername])
        return data
    }
}