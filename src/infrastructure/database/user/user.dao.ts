import { model } from 'mongoose'
import { userSchema } from './user.schema'
import { type User } from '../../../entities/user'


export const userDAO = model<User>('User', userSchema);