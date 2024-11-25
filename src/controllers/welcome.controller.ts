import { Request, Response } from "express";
import WelcomeMessage from "../models/welcome-message";


export async function getWelcomeMessage(req: Request, res: Response){
    try {
        const welcomeMessage = await WelcomeMessage.getWelcomeMessage();
        if(!welcomeMessage){
            return res.status(400).json({success: false});
        }
        
        return res.status(200).json({welcomeMessage});
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}