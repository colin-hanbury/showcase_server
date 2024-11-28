import { Schema } from "mongoose";
import { type User } from "./user";
import { v4 as uuidv4 } from 'uuid';


export const userSchema = new Schema<User>({
    _id: {
        type: String,
        default: () => uuidv4(),
      },
    name: { type: String, required: true },
    nationality: { type: String, required: true },
});


