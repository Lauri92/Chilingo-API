import mongoose, {Schema} from "mongoose"
import {Word} from "../models/wordHandler";

const singleWordSchema = new Schema<Word>({
    category: {type: String, required: true},
    chineseWord: {type: String, required: true},
    pinyin: {type: String, required: true},
    englishWords: {type: [String], required: true},
    audioURL: {type: String, required: true},
    imagePath: {type: String, required: true}
})

export const mongoWordModel = mongoose.model("Singleword", singleWordSchema)