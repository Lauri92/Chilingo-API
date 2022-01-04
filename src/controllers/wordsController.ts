import {RequestHandler} from "express";
import {WordHandler} from "../models/wordHandler";

export const insertWord: RequestHandler = async (req, res) => {
    try {
        const {
            category, chineseWord, pinyin, englishWord, imageName
        } = (req.body as { category: string, chineseWord: string, pinyin: string, englishWord: string[], imageName: string })

        if (englishWord) {
            const newWord: WordHandler = new WordHandler(category, chineseWord, pinyin, englishWord, imageName)
            const inserted = await newWord.addWordToDatabaseAndUploadImageToStorage(req.file)
            res.status(200).json({message: inserted._id})
        } else {
            res.status(400).json({message: "Provide at least 1 English word"})
        }
    } catch (e: any) {
        res.status(400).json({message: e.message})
    }
}

export const getWords: RequestHandler = async (req, res) => {
    try {
        const allWords = await WordHandler.getAllWordsFromDatabase()
        res.status(200).json({code: 200, data: allWords})
    } catch (e: any) {
        res.status(400).send({message: e.message})
    }
}

export const getWordsByCategory: RequestHandler<{ category: string }> = async (req, res) => {
    try {
        const categoryPathParam = req.params.category
        const categoryWords = await WordHandler.getWordsByCategory(categoryPathParam)
        res.status(200).json({code: 200, data: categoryWords})
    } catch (e: any) {
        res.status(400).send({message: e.message})
    }
}

export const deleteWord: RequestHandler<{ id: string }> = async (req, res) => {
    try {
        const idPathParam = req.params.id
        await WordHandler.deleteWordFromDbAndRemoveFromStorage(idPathParam)
        res.status(200).json({message: `Deleted ${idPathParam}`})
    } catch (e: any) {
        res.status(400).send({message: e.message})
    }
}


