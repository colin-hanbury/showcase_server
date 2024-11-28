import { User } from '../entities/user'
import { UserInput } from '../entities/user.input'

export interface IUserRepository {
  addUser(userInput: UserInput): Promise<User>
  getUser: (id: string) => Promise<User | null>
} 

