import mongoose, {Schema} from "mongoose"

export interface ChilingoUser {
    username: string
    password: string
    reviewableWords: string[]
    learnedWords: string[]
}

const chilingoUserSchema = new Schema<ChilingoUser>({
    username: {type: String, required: true},
    password: {type: String, required: true},
    reviewableWords: {type: [String], default: []},
    learnedWords: {type: [String], default: []}
})

export const chilingoUserModel = mongoose.model("ChilingoUser", chilingoUserSchema)