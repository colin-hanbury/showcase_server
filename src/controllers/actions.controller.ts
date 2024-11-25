import { Request, Response } from "express";
import Visitor from "../models/visitor";

export async function addVisitor(req: Request, res: Response){
    try {
        const { name, nationality } = req.body;
        console.log(`name: ${name}`);
        const visitor = await Visitor.addVisitor(name, nationality);
        console.log(`visitor: ${visitor}`);
        if(!visitor){
            console.log(`error: ${visitor}`);
            return res.status(400).json({success: false});
        }
        return res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

export async function getVisitor(){
    try {
        const visitor = await Visitor.getVisitor();

        return visitor;
    } catch (error) {
        console.log(error);
        return;
    }
}