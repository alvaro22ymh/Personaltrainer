import { Router } from "express";

import { forgotPwd, recoverUserPwd, verifyToken } from "../controller/recoverPwd.js";
import { emailExist } from "../helpers/dbValidators.js";
import { body } from "express-validator";
import { fieldsValidatorStopper } from "../middlewares/validation.js";



const recoverRoutes = new Router();

    recoverRoutes.post('/forgot-password',[
        body('email').custom(emailExist),
        fieldsValidatorStopper
    ],forgotPwd)


    recoverRoutes.post('/verifyToken',verifyToken)

    recoverRoutes.put('/updatePwd',recoverUserPwd)


    export default recoverRoutes;