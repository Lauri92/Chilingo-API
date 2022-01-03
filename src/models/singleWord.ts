import {singleWordModel} from "../mongoDB/wordSchema";

export interface WordModel {
    category: string
    chineseWord: string
    englishWords: string[]
}

export class SingleWord {

    private readonly wordModel: WordModel

    constructor(
        public category: string,
        public chineseWord: string,
        public englishWords: string[]
    ) {
        this.wordModel = {
            category: this.category,
            chineseWord: this.chineseWord,
            englishWords: this.englishWords
        }
    }

    async addWord() {
        await singleWordModel.create(this.wordModel)
    }

    printEnglishWords() {
        console.log(this.englishWords)
    }
}