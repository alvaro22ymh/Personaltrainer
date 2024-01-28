
import CreateDbConnection from  '../config/connectionDb.js'
import { dbConnection } from '../index.js'


export const usernameExist = async(username='') =>{

    
    try {
        const [rows,fields] = await dbConnection.query(`SELECT * FROM user WHERE username=?`,[username])
        if(!rows[0]){
            throw new Error(`Username dont exist`)
        }
    } catch (error) {
        throw new Error(`Error in Db username validation: `+ error)
    }

}

export const usernameAlreadyExist = async(username='') =>{


    try {
        const [rows,fields] = await dbConnection.query(`SELECT * FROM user WHERE username=?`,[username])
        if(rows[0]){
            throw new Error(`Username already exist`)
        }
    } catch (error) {
        throw new Error(`Error in Db username validation: `+ error)
    }

}