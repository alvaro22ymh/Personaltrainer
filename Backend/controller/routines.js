import { ExercicesModel } from '../models/exercises.js'
import { RoutineModel } from '../models/routines.js'
import { SaveRoutine } from '../models/saveRoutines.js'


export const randomWeekRoutine = async(req,res)=>{
    const {frequency} = req.query
    try {
        const routine = await RoutineModel.getWeekRoutine(frequency)
        res.json(routine)
        
    } catch (error) {
        res.status(400).json({'Error controller: ':error})
    }
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
export const postRoutine = async(req,res)=>{
    const {routine,user} = req.body
    console.log(routine,user);
    try {

        const save = await SaveRoutine.saveRoutine({routine,user})
        res.json({save})
    } catch (error) {
        res.status(400).json({'Save routine controller': error.message})
    }
  
}
export const getSavedRoutines = async(req,res)=>{
    const {user} = req.query;
    
    try {
        const data = await SaveRoutine.getSavedRoutine({user})
        res.json(data)
        console.log(data);
    } catch (error) {
        res.status(400).json({'Get routine controller': error.message})
    }
  
}
export const deleteRoutine = async(req,res)=>{
    const {routine_id} = req.query;
    
    try {
        const data = await SaveRoutine.deleteRoutine({routine_id})
        res.json(data)
        console.log(data);
    } catch (error) {
        res.status(400).json({'Delete routine controller': error.message})
    }
  
}



