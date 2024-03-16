import {Router} from 'express' 

import { getAllExercises, randomWeekRoutine } from '../controller/routines.js'



const routineRoutes = new Router()

    routineRoutes.get('/randomWeekRoutine',randomWeekRoutine)

    routineRoutes.get('/getAllExercises',getAllExercises)


export default routineRoutes