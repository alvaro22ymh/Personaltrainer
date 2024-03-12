import { Router } from "express";
import { loginController } from "../controller/auth.js";
import { Validator } from "../middlewares/validation.js";
import { emailExist } from "../helpers/dbValidators.js";
import {body} from 'express-validator';




    const authRoutes = new Router()

    authRoutes.post("/login",[
        body('email').custom(emailExist),
        Validator,
      
    ],loginController)

    export default authRoutes

