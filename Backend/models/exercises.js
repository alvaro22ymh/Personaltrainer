import {dbConnection} from '../index.js';


export class ExercicesModel{


    static async getAllUpperExercises(){
        const upperExercices = [];
        const [rows,fields] = await dbConnection.query('SELECT * FROM upper_body_exercise')

        upperExercices.push(rows)
        return upperExercices;
    }

    static async getAllLowerExercises(){
        const lowerExercices =[]
        const [rows,fields] = await dbConnection.query('SELECT * FROM lower_body_exercise')

        lowerExercices.push(rows)
        return lowerExercices;
    }

}