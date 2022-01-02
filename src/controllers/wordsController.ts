import {RequestHandler} from "express";
import {singleWordModel} from "../mongoDB/wordSchema";
import {SingleWord} from "../models/singleWord";


export const insertWord: RequestHandler = async (req, res, next) => {
    const {
        category,
        chineseWord,
        englishWord
    } = (req.body as { category: string, chineseWord: string, englishWord: string[] })

    const newWord: SingleWord = new SingleWord(category, chineseWord, englishWord)
    newWord.printInfo()
    console.log(englishWord)

    const wordModel = {
        category: category,
        chineseWord: chineseWord,
        englishWords: englishWord
    }


   await singleWordModel.create(wordModel)


    res.status(200).json({message: req.body})
}
