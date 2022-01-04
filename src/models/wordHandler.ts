import {singleWordModel} from "../mongoDB/wordSchema";
import * as googleTTS from 'google-tts-api';

export interface Word {
    category: string
    chineseWord: string
    englishWords: string[]
    audioURL: string
}

export class WordHandler {

    private readonly wordModel: Word

    constructor(public category: string, public chineseWord: string, public englishWords: string[]) {

        this.wordModel = {
            category: this.category,
            chineseWord: this.chineseWord,
            englishWords: this.englishWords,
            audioURL: WordHandler.generateAudioUrl(chineseWord)
        }
    }

    private static generateAudioUrl(chineseWord: string): string {
        return googleTTS.getAudioUrl(chineseWord, {
            lang: 'zh',
            slow: false,
            host: 'https://translate.google.com',
        })
    }

    async addWordToDatabase() {
        return await singleWordModel.create(this.wordModel)
    }

    printEnglishWords() {
        console.log(this.englishWords)
    }

    static async getAllWordsFromDatabase() {
        return singleWordModel.find({});
    }

    static async getWordsByCategory(category: string) {
        const wordsByCategory: Word[] = await singleWordModel.find({category: category});
        return sortByEnglishName(wordsByCategory)
    }


}

function sortByEnglishName(wordList: Word[]) {
    return wordList.sort((a: Word, b: Word) =>
        (a.englishWords[0] > b.englishWords[0]) ? 1 : ((b.englishWords[0] > a.englishWords[0]) ? -1 : 0))
}