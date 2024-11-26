import { Request, Response } from "express";
import { User } from "../entities/user";
import { inject } from "inversify";
import { BaseHttpController, controller, httpPost } from "inversify-express-utils";
import { UserService } from "../application/services/user.service";

@controller('/actions')
export class ActionsController extends BaseHttpController {

    constructor(@inject(UserService) private readonly userService: UserService) { super();}

    @httpPost("/")
    async addUser(req: Request, res: Response){
        try {
            const { name, nationality } = req.body;
            const user: User = await this.userService.addUser(name, nationality);
            res.status(200).json({user});
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}