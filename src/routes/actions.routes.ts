import  { Router,} from "express";
import { addVisitor } from "../controllers/actions.controller";


export const actionsRouter = Router();
actionsRouter.post("/", addVisitor);
