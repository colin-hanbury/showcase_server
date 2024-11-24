import {Router,} from "express";
import { getWelcomeMessage } from "../controllers/welcome.controller";


class WelcomeRoutes {
    router = Router();

    constructor(){
        this.initRoutes();
    }
    initRoutes(){
        this.router.get("/", getWelcomeMessage);
    }
}

export default new WelcomeRoutes().router;