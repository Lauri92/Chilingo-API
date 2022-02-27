import {mongoWordModel} from "../mongoDB/wordSchema";
import * as googleTTS from 'google-tts-api';
import {BlobServiceClient} from "@azure/storage-blob";

const containerName = 'chilingo-images';
import * as fs from "fs";

const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(
    storageAccountConnectionString!);

export interface Word {
    category: string
    chineseWord: string
    pinyin: string
    englishWords: string[]
    audioURL: string
    imagePath: string
    hskLevel: number,
    examples: Example[]
}

export class Example {

    constructor(public hanzi: string, public pinyin: string, public english: string[]) {
        this.hanzi = hanzi
        this.pinyin = pinyin
        this.english = english
    }
}

export class WordHandler {

    private readonly wordModel: Word

    constructor(public category: string,
                public chineseWord: string,
                public pinyin: string,
                public englishWords: string[],
                public imageName: string,
                public hskLevel: number,
                public examples: Example[]
    ) {

        this.wordModel = {
            category: this.category,
            chineseWord: this.chineseWord,
            pinyin: this.pinyin,
            englishWords: this.englishWords,
            audioURL: WordHandler.generateAudioUrl(chineseWord),
            imagePath: `${containerName}/${this.imageName}`,
            hskLevel: this.hskLevel,
            examples: this.examples
        }
    }

    private static generateAudioUrl(chineseWord: string): string {
        return googleTTS.getAudioUrl(chineseWord, {
            lang: 'zh',
            slow: false,
            host: 'https://translate.google.com',
        })
    }

    async addWordToDatabaseAndUploadImageToStorage(file: Express.Multer.File | undefined) {
        if (file) {

            const containerClient = await blobServiceClient.getContainerClient(
                containerName);
            await containerClient.createIfNotExists();
            const filename = `${file.filename}`;
            const filePath = `uploads/${filename}`
            const blockBlobClient = await containerClient.getBlockBlobClient(
                filename);
            await blockBlobClient.uploadFile(filePath);
            await fs.unlink(filePath, err => {
                if (err) throw err;
            });
            return await mongoWordModel.create(this.wordModel)
        } else {
            throw new Error("Unexpected file type!")
        }
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

    static async unlinkUploadedFile(file: Express.Multer.File | undefined) {
        const filename = `${file?.filename}`;
        const filePath = `uploads/${filename}`
        await fs.unlink(filePath, err => {
            if (err) throw err;
        });
    }

    static async deleteWordFromDbAndRemoveFromStorage(id: string) {
        const deletedItem = await mongoWordModel.findByIdAndDelete(id);
        if (deletedItem) {
            const blobToDelete = deletedItem.imagePath.substring(16).toString();
            const container = await blobServiceClient.getContainerClient(containerName);
            await container.deleteBlob(blobToDelete);
        }
    }

}

function sortByEnglishName(wordList: Word[]): Word[] {
    return wordList.sort((a: Word, b: Word) =>
        (a.englishWords[0] > b.englishWords[0]) ? 1 : ((b.englishWords[0] > a.englishWords[0]) ? -1 : 0))
}