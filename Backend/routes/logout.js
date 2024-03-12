import { Router } from "express";
import { logoutTokenController } from "../controller/logout.js";




    const logoutRoutes = new Router()

    logoutRoutes.post("/",logoutTokenController)

    export default logoutRoutes
