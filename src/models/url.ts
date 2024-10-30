import mongoose, { Schema, Document } from "mongoose";

interface IQuery extends Document {
    url: string,
    shortCode: string
    createdAt: Date,
    updatedAt: Date
}

const urlSchema = new Schema({
    url: { type: String, required: true },
    shortCode: {type: String, requierd: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const queryModel = mongoose.model<IQuery>('Query', urlSchema)
export default queryModel