import { Router } from "express";
import {body} from 'express-validator';
import { Validator, fieldsValidatorStopper } from "../middlewares/validation.js";
import { createUser, getUser, getUserByRefreshToken, updateUserEmail, updateUserPwd } from "../controller/user.js";
import { emailAlreadyExist, emailExist, usernameAlreadyExist, usernameExist } from "../helpers/dbValidators.js";
import { ROLES_LIST } from "../config/rolesList.js";
import { verifyRoles } from "../middlewares/verifyRoles.js";


export const registerRoute = new Router()

registerRoute.post("/createAccount",[
    body('username').custom(usernameAlreadyExist),
    body('email').custom(emailAlreadyExist),
    fieldsValidatorStopper,
    Validator
],createUser)

registerRoute.post("/verifyData",[
    body('username').custom(usernameAlreadyExist),
    body('email').custom(emailAlreadyExist),
    fieldsValidatorStopper,
],(req,res)=>{res.status(200).json({msg:"Fields ok"})})

export const userRoutes = new Router()


    // userRoutes.get()
    userRoutes.get('/getUser',[
        fieldsValidatorStopper,
        verifyRoles(ROLES_LIST.Admin,ROLES_LIST.User,ROLES_LIST.Editor),
        Validator
    ],getUser)

export const googleGetForUser = new Router()

    googleGetForUser.get('/getUserByRefreshToken',[
        fieldsValidatorStopper,
        Validator
    ],getUserByRefreshToken)






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


