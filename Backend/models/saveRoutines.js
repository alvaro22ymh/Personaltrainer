import {dbConnection} from '../index.js';


export class SaveRoutine {

    static async saveRoutine({routine,user}) {
        try {
            const save = await dbConnection.query('INSERT INTO saved_routines (user_id, data) VALUES ((SELECT user_id FROM user WHERE email = ?),?)',[user,routine])
            return 'Routine Savesd successfully';
        } catch (error) {
            throw new Error('Error saving routine in Db: '+error)
        }
    }


    static async getSavedRoutine({user}) {
        try {
            const [rows,fields] = await dbConnection.query('SELECT id, data FROM saved_routines WHERE user_id = (SELECT user_id FROM user WHERE email = ?)', [user])
            return rows;
        } catch (error) {
            throw new Error('Error geting routine in Db: '+error)
        }
    }
    static async deleteRoutine({routine_id}) {
        try {
            const res = await dbConnection.query('DELETE FROM saved_routines WHERE id = ?', [routine_id])
            return 'Deleted Successfully';
        } catch (error) {
            throw new Error('Error deleting routine in Db: '+error)
        }
    }

}