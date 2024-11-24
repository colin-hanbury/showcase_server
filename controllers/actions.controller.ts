import { Request, Response } from "express";
import Visitor from "../models/visitor";

export function postAction(req: Request, res: Response){
    try {
        const { name, nationality } = req.body;
        const welcomeMessage = Visitor.addVisitor(name, nationality);
        if(!welcomeMessage){
            return res.status(400).json({success: false});
        }
        return res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}