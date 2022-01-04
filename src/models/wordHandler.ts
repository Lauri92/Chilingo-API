import {mongoWordModel} from "../mongoDB/wordSchema";
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
        return await mongoWordModel.create(this.wordModel)
    }

    printEnglishWords() {
        console.log(this.englishWords)
    }

    static async getAllWordsFromDatabase() {
        return mongoWordModel.find({});
    }

    static async getWordsByCategory(category: string): Promise<Word[]> {
        const wordsByCategory: Word[] = await mongoWordModel.find({category: category});
        return sortByEnglishName(wordsByCategory);
    }

    static async deleteWord(id: string) {
        await mongoWordModel.findByIdAndDelete(id)
    }

}

function sortByEnglishName(wordList: Word[]): Word[] {
    return wordList.sort((a: Word, b: Word) =>
        (a.englishWords[0] > b.englishWords[0]) ? 1 : ((b.englishWords[0] > a.englishWords[0]) ? -1 : 0))
}