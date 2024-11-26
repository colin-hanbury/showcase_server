import { IUserRepository } from "./user-repo.interface";
import { User } from "../../../entities/user";
import { userDAO } from "../user/user.dao";
import { UserInput } from "../../../entities/user.input";
import { injectable } from "inversify";

@injectable()
export class UserRepository implements IUserRepository {

  async addUser(userInput: UserInput): Promise<User> {
    return await userDAO.create(userInput);
  }
  async getUser(id: string): Promise<User | null>{
    return await userDAO.findById(id);
  }
}