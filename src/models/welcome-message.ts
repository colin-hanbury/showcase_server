import { Model, model, Schema } from "mongoose";
import { getVisitor } from "../controllers/actions.controller";
import { IVisitor } from "./visitor";


export interface IWelcomeMessage{
    title: string;
    message: string;
}

export interface WelcomeMessageModel extends Model<IWelcomeMessage>{
    getWelcomeMessage(): IWelcomeMessage;
}

const welcomeMessageSchema = new Schema<IWelcomeMessage, WelcomeMessageModel>({
    title: { type: String, required: true },
    message: { type: String, required: true },
});
welcomeMessageSchema.static('getWelcomeMessage', async function getWelcomeMessage() {
    try {
        const welcomeMessages: IWelcomeMessage[] =  await this.find({});
        const welcomeMessage: IWelcomeMessage = welcomeMessages[0];
        const visitor: IVisitor | undefined = await getVisitor();
        welcomeMessage.title += ` ${visitor!.name}`;
        welcomeMessage.message += ` and ${visitor!.nationality}`;
        return welcomeMessage;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const WelcomeMessage = model<IWelcomeMessage, WelcomeMessageModel>('WelcomeMessage', welcomeMessageSchema);

export default WelcomeMessage;