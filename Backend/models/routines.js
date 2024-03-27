import { getRandomNumberFromSet } from '../helpers/randomNumber.js';
import {dbConnection} from '../index.js';

export class RoutineModel {
    static async getWeekRoutine(frequency){
        let monday=[], tuesday=[], wednesday=[], thursday=[], friday=[]; 
        let legDay=[],upperDay=[]
        
        let takenLower = []
        let takenUpper = []
        switch (frequency) {
            case 'legDay':
                for(let i=0;i<5;i++){
                        
                    let legExercise = await getRandomNumberFromSet([4,5,6,7,8,9,10,11,12,13,14,15,16])
                    let flag
                    do{
                        flag =takenLower.includes(legExercise)
                        if(takenLower.includes(legExercise)){
                        legExercise = await getRandomNumberFromSet([4,5,6,7,8,9,10,11,12,13,14,15,16])
                    }
                    }while(flag==true)
                    
                    takenLower.push(legExercise)
                    const [rows,fields]= await dbConnection.query('SELECT * FROM lower_body_exercise WHERE exercise_id=?',[legExercise])
           
                    legDay.push(rows[0])
                    
                }
                legDay.sort((a,b)=>b.muscle_id - a.muscle_id)
                takenLower = []
                return legDay;
                
            case 'upperDay':
                for(let i=0;i<7;i++){
                        
                    let upperExercise = getRandomNumberFromSet([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27])
                  
                    while(takenUpper.includes(upperExercise)){
                        upperExercise = await getRandomNumberFromSet([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27])
                    }

                    takenUpper.push(upperExercise)
                    const [rows,fields]= await dbConnection.query('SELECT * FROM upper_body_exercise WHERE exercise_id=?',[upperExercise])
                    upperDay.push(rows[0])
                    
                }
                upperDay.sort((a,b)=>a.muscle_id - b.muscle_id)

                return upperDay;

            case 'week':

                    for(let i=0;i<5;i++){
                        
                        let legExercise = await getRandomNumberFromSet([4,5,6,7,8,9,10,11,12,13,14,15,16])
                        let flag
                        do{
                            flag =takenLower.includes(legExercise)
                            if(takenLower.includes(legExercise)){
                            legExercise = await getRandomNumberFromSet([4,5,6,7,8,9,10,11,12,13,14,15,16])
                        }
                        }while(flag==true)
                        
                        takenLower.push(legExercise)
                        const [rows,fields]= await dbConnection.query('SELECT * FROM lower_body_exercise WHERE exercise_id=?',[legExercise])
               
                        monday.push(rows[0])
                        
                    }
                    monday.sort((a,b)=>b.muscle_id - a.muscle_id)
                    takenLower = []

                    for(let i=0;i<7;i++){
                        
                        let upperExercise = getRandomNumberFromSet([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27])
                      
                        if(takenUpper.includes(upperExercise)){
                            upperExercise = await getRandomNumberFromSet([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27])
                        }
                        takenUpper.push(upperExercise)
                        const [rows,fields]= await dbConnection.query('SELECT * FROM upper_body_exercise WHERE exercise_id=?',[upperExercise])
                        tuesday.push(rows[0])
                        
                    }
                    tuesday.sort((a,b)=>a.muscle_id - b.muscle_id)

                    for(let i=0;i<5;i++){
                        
                        let legExercise = await getRandomNumberFromSet([4,5,6,7,8,9,10,11,12,13,14,15,16])
                        let flag
                        do{
                            flag =takenLower.includes(legExercise)
                            if(takenLower.includes(legExercise)){
                            legExercise = await getRandomNumberFromSet([4,5,6,7,8,9,10,11,12,13,14,15,16])
                        }
                        }while(flag==true)
                        
                        takenLower.push(legExercise)
                        const [rows,fields]= await dbConnection.query('SELECT * FROM lower_body_exercise WHERE exercise_id=?',[legExercise])
               
                        wednesday.push(rows[0])
                    }
                    wednesday.sort((a,b)=>b.muscle_id - a.muscle_id)
                    takenLower = []
                
                    for(let i=0;i<7;i++){
                        
                        let upperExercise = getRandomNumberFromSet([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27])
                      
                        if(takenUpper.includes(upperExercise)){
                            upperExercise = await getRandomNumberFromSet([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27])
                        }
                        takenUpper.push(upperExercise)
                        const [rows,fields]= await dbConnection.query('SELECT * FROM upper_body_exercise WHERE exercise_id=?',[upperExercise])
                        thursday.push(rows[0])
                        
                    }
                    thursday.sort((a,b)=>a.muscle_id - b.muscle_id)


                    for(let i=0;i<5;i++){
                        
                        let legExercise = await getRandomNumberFromSet([4,5,6,7,8,9,10,11,12,13,14,15,16])
                        let flag
                        do{
                            flag =takenLower.includes(legExercise)
                            if(takenLower.includes(legExercise)){
                            legExercise = await getRandomNumberFromSet([4,5,6,7,8,9,10,11,12,13,14,15,16])
                        }
                        }while(flag==true)
                        
                        takenLower.push(legExercise)
                        const [rows,fields]= await dbConnection.query('SELECT * FROM lower_body_exercise WHERE exercise_id=?',[legExercise])
               
                        friday.push(rows[0])
                    }
                    friday.sort((a,b)=>b.muscle_id - a.muscle_id)
                    takenLower = []

               const week = {
                    'monday': monday,
                    'tuesday':tuesday,
                    'wednesday':wednesday,
                    'thursday':thursday,
                    'friday':friday
               }
               return week;
        
                
        default:
            throw new Error(`Bad request on frequency of routine Model, value: ${frequency}`);
        }
    }
}