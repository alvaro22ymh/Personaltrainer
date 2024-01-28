import {Router} from 'express' 

import { randomWeekRoutine } from '../controller/routines.js'



const routineRoutes = new Router()

    routineRoutes.get('/randomWeekRoutine',randomWeekRoutine)


export default routineRoutes