import { inject, injectable } from "inversify";
import { User } from "../entities/user";
import { UserInput } from "../entities/user.input";
import { UserRepository } from "../repos/user.repo.mongo";
import { IUserService } from "./user.interface.service";

@injectable()
export class UserService implements IUserService{

    constructor(@inject(UserRepository) private readonly userRepository: UserRepository){}

    async getUserWelcomeMessage (id: any): Promise<string> {
        if(this.idIsValid(id)){
            const user : User | null = await this.userRepository.getUser(id!);
            if(this.isUserFound(user)) {
                return this.buildWelcomeMessage(user!);
            }
        }
        return this.defaultWelcomeMessage;
    };
    async addUser(name: string, nationality: string): Promise<User> {
        const userInput : UserInput = {name: name, nationality: nationality};
        const user : User = await this.userRepository.addUser(userInput);
        return user;
    }

    private idIsValid(id:string | null): boolean {
        if(id){
            return true;
        }
        else{
            return false;
        }
    }
    private isUserFound(user: User | null): boolean{
        return !(user == null);
    }

    private buildWelcomeMessage(user: User): string {
        return `Welcome back ${user.name} my ${user.nationality} friend`;
    }
    private defaultWelcomeMessage: string = 'Welcome';
}