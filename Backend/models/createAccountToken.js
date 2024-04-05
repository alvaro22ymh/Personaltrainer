import {dbConnection} from '../index.js';

export class RegisterTokenModel{

    static async saveToken({token}) {
   
        console.log(token);
        try {
            const save = await dbConnection.query('INSERT INTO create_account_tokens (token) VALUES (?)',[token])
            return 'TOken saved successfully'
        } catch (error) {
            throw new Error("Error saving token on db: "+error.message)
        }
    }
    static async deleteToken({token}) {
        console.log(token);
      
        try {
            const save = await dbConnection.query('DELETE FROM create_account_tokens WHERE token=?',[token])
            return 'TOken DELETED successfully'
        } catch (error) {
            throw new Error("Error deleting token on db: "+error.message)
        }
    }


    static async getToken({token}) {
    

        try {
            const [rows,fields] = await dbConnection.query('SELECT * FROM create_account_tokens WHERE token=? ',[token])
            return rows
        } catch (error) {
            throw new Error("Error getting token on db: "+error.message)
        }
    }
}