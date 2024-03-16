import { ExercicesModel } from '../models/exercises.js'
import { RoutineModel } from '../models/routines.js'


export const randomWeekRoutine = async(req,res)=>{
    const {frequency} = req.body
    const routine = await RoutineModel.getWeekRoutine(frequency)
    res.json(routine)
}
export const getAllExercises = async(req,res)=>{
    
    try {
        const data1= await ExercicesModel.getAllUpperExercises()
        const data2 = await ExercicesModel.getAllLowerExercises()
        const upperExercises = data1[0];
        const lowerExercises = data2[0];
        res.json({upperExercises,lowerExercises})
    } catch (error) {
        res.status(400).json({'get all exercises controller': error})
    }


    
}


