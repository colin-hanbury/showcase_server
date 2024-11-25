import { HydratedDocument, Model, model, Schema } from "mongoose";

export interface IVisitor{
    name: string;
    nationality: string;
}

export interface VisitorModel extends Model<IVisitor>{
    getVisitor(): IVisitor;
    addVisitor(name: string, nationality: string): Promise<HydratedDocument<IVisitor>>;
}

const visitorSchema = new Schema<IVisitor, VisitorModel>({
    name: { type: String, required: true },
    nationality: { type: String, required: true },
});


visitorSchema.static('addVisitor', async function addVisitor(name: string, nationality: string) {
    try {
        const existingVisitor = await this.findOne({ name: name });
        if(existingVisitor){
            return existingVisitor;
        }
        const newVisitor = this.create({name, nationality});
        return newVisitor;
    } catch (error) {
        throw error;
    }
  });

  visitorSchema.static('getVisitor', async function getVisitor() {
    try {
        const visitors: IVisitor[] =  await this.find({});
        const visitor: IVisitor = visitors[visitors.length-1];
        return visitor;
    } catch (error) {
        console.log(error);
        throw error;
    }
});


const Visitor = model<IVisitor, VisitorModel>('Visitor', visitorSchema);

export default Visitor;