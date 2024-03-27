import {Router} from 'express' 

import { getAllExercises, getSavedRoutines, postRoutine, randomWeekRoutine,deleteRoutine} from '../controller/routines.js'



const routineRoutes = new Router()

    routineRoutes.get('/randomWeekRoutine',randomWeekRoutine)

    routineRoutes.get('/getAllExercises',getAllExercises)

    routineRoutes.post('/saveRoutine',postRoutine)

    routineRoutes.get('/getSavedRoutines',getSavedRoutines)

    routineRoutes.delete('/deleteSavedRoutine',deleteRoutine)


export default routineRoutes