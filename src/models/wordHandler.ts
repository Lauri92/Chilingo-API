import {singleWordModel} from "../mongoDB/wordSchema";
import {Schema} from "mongoose";

export interface WordModel {
    category: string
    chineseWord: string
    englishWords: string[]
}

interface FetchedList {
    code: number
    data: SingleDatabaseItem[]
}

interface SingleDatabaseItem {
    _id: string
    category: string
    chineseWord: string
    englishWords: string[]
    "__v": number
}

export class WordHandler {

    private readonly wordModel: WordModel

    constructor(public category: string, public chineseWord: string, public englishWords: string[]) {
        this.wordModel = {
            category: this.category,
            chineseWord: this.chineseWord,
            englishWords: this.englishWords
        }
    }

    async addWordToDatabase() {
        await singleWordModel.create(this.wordModel)
    }

    printEnglishWords() {
        console.log(this.englishWords)
    }

    static async getAllWordsFromDatabase() {
        return singleWordModel.find({});
    }

    static async getWordsByCategory(category: string) {
        const wordsByCategory = await singleWordModel.find({category: category});
        return sortByEnglishName(wordsByCategory)
    }


}

function sortByEnglishName(wordList: any[]) {
    return wordList.sort((a: SingleDatabaseItem, b: SingleDatabaseItem) =>
        (a.englishWords[0] > b.englishWords[0]) ? 1 : ((b.englishWords[0] > a.englishWords[0]) ? -1 : 0))
}