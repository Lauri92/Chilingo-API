import {RequestHandler} from "express";
import {WordHandler} from "../models/wordHandler";

export const insertWord: RequestHandler = async (req, res, next) => {
    try {
        const {
            category, chineseWord, englishWord
        } = (req.body as { category: string, chineseWord: string, englishWord: string[] })

        if (englishWord) {
            const newWord: WordHandler = new WordHandler(category, chineseWord, englishWord)
            const inserted = await newWord.addWordToDatabase()
            res.status(200).json({message: `Inserted word ${inserted.chineseWord}`})
        } else {
            res.status(400).json({message: "Provide at least 1 English word"})
        }
    } catch (e: any) {
        res.status(400).json({message: e.message})
    }
}

export const getWords: RequestHandler = async (req, res, next) => {
    try {
        const allWords = await WordHandler.getAllWordsFromDatabase()
        res.status(200).json({code: 200, data: allWords})
    } catch (e: any) {
        res.status(400).send({message: e.message})
    }
}

export const getWordsByCategory: RequestHandler<{ category: string }> = async (req, res, next) => {
    try {
        const categoryPathParam = req.params.category
        const categoryWords = await WordHandler.getWordsByCategory(categoryPathParam)
        res.status(200).json({code: 200, data: categoryWords})
    } catch (e: any) {
        res.status(400).send({message: e.message})
    }
}


