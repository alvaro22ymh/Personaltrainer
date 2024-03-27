import {dbConnection} from '../index.js';

export class RecoverModel{

    static async saveToken({user,token}) {
        console.log(user);
        console.log(token);
        try {
            const save = await dbConnection.query('INSERT INTO password_reset_tokens (user_id, token) VALUES ((SELECT user_id FROM user WHERE email = ?),?)',[user,token])
            return 'TOken saved successfully'
        } catch (error) {
            throw new Error("Error saving token on db: "+error.message)
        }
    }
    static async deleteToken({token}) {
        console.log(token);
      
        try {
            const save = await dbConnection.query('DELETE FROM password_reset_tokens WHERE token=?',[token])
            return 'TOken DELETED successfully'
        } catch (error) {
            throw new Error("Error deleting token on db: "+error.message)
        }
    }


    static async getToken({token}) {
    

        try {
            const [rows,fields] = await dbConnection.query('SELECT * FROM password_reset_tokens WHERE token = ? ',[token])
            return rows
        } catch (error) {
            throw new Error("Error getting token on db: "+error.message)
        }
    }
}