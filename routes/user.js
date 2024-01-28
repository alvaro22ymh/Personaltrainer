import { Router } from "express";
import {body} from 'express-validator';
import { Validator, fieldsValidatorStopper } from "../middlewares/validation.js";
import { createUser } from "../controller/user.js";
import { usernameAlreadyExist } from "../helpers/dbValidators.js";


const userRoutes = new Router()

    userRoutes.post("/register",[
        body('username').custom(usernameAlreadyExist),
        fieldsValidatorStopper,
        Validator
    ],createUser)




    // userRoutes.get()

    // userRoutes.put

    // userRoutes.delete()


    export default userRoutes;