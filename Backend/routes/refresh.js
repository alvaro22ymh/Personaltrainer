import { Router } from "express";
import { refreshTokenController } from "../controller/refreshToken.js";
import { verityJWT } from "../middlewares/verifyJWT.js";




    const refreshRoutes = new Router()

    refreshRoutes.get("/",verityJWT,refreshTokenController)

    export default refreshRoutes
