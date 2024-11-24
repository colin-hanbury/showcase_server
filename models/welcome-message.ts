import { Model, model, Schema } from "mongoose";
import { title } from "process";

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
        const welcomeMessage: IWelcomeMessage[] =  await this.find({});
        return welcomeMessage[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const WelcomeMessage = model<IWelcomeMessage, WelcomeMessageModel>('WelcomeMessage', welcomeMessageSchema);

export default WelcomeMessage;