import mongoose, {Schema} from "mongoose"

export interface SingleWord {
    category: string
    chineseWord: string
    englishWords: string[]
}

const singleWordSchema = new Schema<SingleWord>({
    category: {type: String, required: true},
    chineseWord: {type: String, required: true},
    englishWords: [{type: String, required: true}],
})

export const singleWordModel = mongoose.model("Singleword", singleWordSchema)