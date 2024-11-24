import { Model, model, Schema } from "mongoose";

export interface IVisitor{
    name: string;
    nationality: string;
}

export interface VisitorModel extends Model<IVisitor>{
    addVisitor(name: string, nationality: string): IVisitor;
}

const visitorSchema = new Schema<IVisitor, VisitorModel>({
    name: { type: String, required: true },
    nationality: { type: String, required: true },
});


visitorSchema.method('addVisitor', function addVisitor(name: string, nationality: string) {
    try {
        this.name = name;
        this.nationality = nationality;
        return this.save();
    } catch (error) {
        throw error;
    }
  });


const Visitor = model<IVisitor, VisitorModel>('Visitor', visitorSchema);

export default Visitor;