import { RoutineModel } from '../models/routines.js'


export const randomWeekRoutine = async(req,res)=>{
    const {frequency} = req.body
    const routine = await RoutineModel.getWeekRoutine(frequency)
    res.json(routine)
}