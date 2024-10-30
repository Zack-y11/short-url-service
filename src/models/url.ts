import mongoose, { Schema, Document } from "mongoose";

interface IQuery extends Document {
    url: string,
    shortCode: string,
    createdAt: Date,
    updatedAt: Date,
    accessCount: number
}

const urlSchema = new Schema({
    url: { type: String, required: true },
    shortCode: {type: String, requierd: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    accessCount: { type: Number, default: 0 }
})

const queryModel = mongoose.model<IQuery>('Query', urlSchema)
export default queryModel