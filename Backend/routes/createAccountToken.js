import { Router } from "express";

import { sendToken, verifyToken } from "../controller/createAccountToken.js";



const CreateAccountTokenRoutes = new Router();

    CreateAccountTokenRoutes.post('/send-verification',sendToken)


    CreateAccountTokenRoutes.post('/verifyToken',verifyToken)




    export default CreateAccountTokenRoutes;