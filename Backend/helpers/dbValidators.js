
import { dbConnection } from '../index.js'
import { UserModel } from '../models/user.js'

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

export const refreshToken = async(email='') =>{

    const [user] = await UserModel.findOne(email) 
      console.log(user);
      const validEmail = await bcrypt.compare(password,user.password)
    try {
        const [rows,fields] = await dbConnection.query(`SELECT * FROM user WHERE userId=?`,[userId])
        if(!rows[0]){
            throw new Error(`AccessToken dont exist`)
        }
    } catch (error) {
        throw new Error(`Error in Db AccessToken validation: `+ error)
    }

}
export const emailExist = async(email='') =>{

    const lowerCase = email.toLowerCase();

    try {
        const [rows,fields] = await dbConnection.query(`SELECT * FROM user WHERE email=?`,[lowerCase])
        if(!rows[0]){
            throw new Error(`Email ${email} dont exist`)
        }
    } catch (error) {
        throw new Error(`Error in Db Email ${email} validation: `+ error)
    }

}

export const usernameAlreadyExist = async(username='') =>{


    try {
        const [rows,fields] = await dbConnection.query(`SELECT * FROM user WHERE username=?`,[username])
        if(rows[0]){
            throw new Error(`Username already exist`)
        }
    } catch (error) {
        throw new Error(error)
    }

}
export const emailAlreadyExist = async(email='') =>{


    try {
        const [rows,fields] = await dbConnection.query(`SELECT * FROM user WHERE email=?`,[email])
        if(rows[0]){
            throw new Error(`email already exist`)
        }
    } catch (error) {
        throw new Error(error)
    }

}