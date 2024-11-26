import { Request, Response } from "express";
import { UserService } from "../application/services/user.service";
import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";

@controller('/welcome')
export class WelcomeController extends BaseHttpController{

    constructor(@inject(UserService) private readonly userService: UserService) {
        super();
    }

    @httpGet("/")
    async getWelcomeMessage(req: Request, res: Response){
        try {
            const id: string = req.query.id as string;
            const message: string = await this.userService.getUserWelcomeMessage(id);
            res.status(200).json({message: message});
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}
