import { Router } from "express";
import { loginController } from "../controller/auth.js";
import { Validator } from "../middlewares/validation.js";
import { usernameExist } from "../helpers/dbValidators.js";
import {body} from 'express-validator';




    const authRoutes = new Router()

    authRoutes.get("/login",[
        body('username').custom(usernameExist),
        Validator
    ],loginController)

    export default authRoutes

