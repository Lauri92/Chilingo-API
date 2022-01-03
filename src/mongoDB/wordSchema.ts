import mongoose, {Schema} from "mongoose"
import {WordModel} from "../models/wordHandler";

const singleWordSchema = new Schema<WordModel>({
    category: {type: String, required: true},
    chineseWord: {type: String, required: true},
    englishWords: {type: [String], required: true},
})

export const singleWordModel = mongoose.model("Singleword", singleWordSchema)