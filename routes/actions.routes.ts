import express, { Express, Router,} from "express";
import { postAction } from "../controllers/actions.controller";

const app: Express = express();
const router = express.Router();

class WelcomeRoutes {
    router = Router();

    constructor(){
        this.initRoutes();
    }
    initRoutes(){
        this.router.post("/", postAction);
    }
}

export default new WelcomeRoutes().router;