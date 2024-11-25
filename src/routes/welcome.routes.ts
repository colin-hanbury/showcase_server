import {Router} from "express";
import { getWelcomeMessage } from "../controllers/welcome.controller";


export const welcomeRouter = Router();
welcomeRouter.get("/", getWelcomeMessage);
