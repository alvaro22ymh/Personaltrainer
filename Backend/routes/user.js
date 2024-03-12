import { Router } from "express";
import {body} from 'express-validator';
import { Validator, fieldsValidatorStopper } from "../middlewares/validation.js";
import { createUser, getUser, updateUserEmail, updateUserPwd } from "../controller/user.js";
import { emailAlreadyExist, emailExist, usernameAlreadyExist, usernameExist } from "../helpers/dbValidators.js";
import { ROLES_LIST } from "../config/rolesList.js";
import { verifyRoles } from "../middlewares/verifyRoles.js";


const userRoutes = new Router()

    userRoutes.post("/register",[
        body('username').custom(usernameAlreadyExist),
        fieldsValidatorStopper,
        Validator
    ],createUser)




    // userRoutes.get()
    userRoutes.get('/getUser',[
        fieldsValidatorStopper,
        verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User,ROLES_LIST.Editor),
        Validator
    ],getUser)

    // userRoutes.put

    
    userRoutes.put('/updateUserPwd',[
        body('email').custom(emailExist),
        fieldsValidatorStopper,
        Validator
    ],updateUserPwd)

    userRoutes.put('/updateUserEmail',[
        body('email').custom(emailAlreadyExist),
        fieldsValidatorStopper,
        Validator
    ],updateUserEmail)



    // userRoutes.delete()


    export default userRoutes;