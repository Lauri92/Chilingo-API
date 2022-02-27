import {RequestHandler} from "express";
import {Example, WordHandler} from "../models/wordHandler";
import fs from "fs";

export const insertWord: RequestHandler = async (req, res) => {
    try {
        const {
            category,
            chineseWord,
            pinyin,
            englishWord,
            imageName,
            hskLevel,
            exampleHanzi,
            examplePinyin,
            exampleEnglish1,
            exampleEnglish2,
            exampleEnglish3
        } = (req.body as
            {
                category: string,
                chineseWord: string,
                pinyin: string,
                englishWord: string[],
                imageName: string,
                hskLevel: number,
                exampleHanzi: string[],
                examplePinyin: string[],
                exampleEnglish1: string[],
                exampleEnglish2: string[],
                exampleEnglish3: string[]
            })

        if (englishWord && exampleHanzi.length <= 3 && examplePinyin.length <= 3) {

            const exampleArray: Example[] = []
            exampleHanzi.forEach((hanzi, index) => {
                if (index == 0) {
                    let example = new Example(hanzi, examplePinyin[index], exampleEnglish1)
                    exampleArray.push(example)
                } else if (index == 1) {
                    let example = new Example(hanzi, examplePinyin[index], exampleEnglish2)
                    exampleArray.push(example)
                } else if (index == 2) {
                    let example = new Example(hanzi, examplePinyin[index], exampleEnglish3)
                    exampleArray.push(example)
                } else {
                    res.status(400).json({message: "Only 3 examples allowed."})
                }
            })

            const newWord: WordHandler =
                new WordHandler(category, chineseWord, pinyin, englishWord, imageName, hskLevel, exampleArray)
            const inserted = await newWord.addWordToDatabaseAndUploadImageToStorage(req.file)
            res.status(200).json({message: inserted._id})
        } else {
            await WordHandler.unlinkUploadedFile(req.file)
            res.status(400).json({message: "Provide at least 1 English word, maximum of 3 examples allowed"})
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

export const updateWord: RequestHandler<{ id: string }> = async (req, res) => {

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


