import {RequestHandler} from "express";
import {SingleWord} from "../models/singleWord";


export const insertWord: RequestHandler = async (req, res, next) => {
    try {
        const {
            category, chineseWord, englishWord
        } = (req.body as { category: string, chineseWord: string, englishWord: string[] })

        if (englishWord) {
            const newWord: SingleWord = new SingleWord(category, chineseWord, englishWord)
            await newWord.addWord()
            res.status(200).json({message: req.body})
        } else {
            res.status(400).json({message: "Provide at least 1 English word"})
        }
    } catch (e: any) {
        res.status(400).json({message: e.message})
    }
}
