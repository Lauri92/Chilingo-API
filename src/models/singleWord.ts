export class SingleWord {
    constructor(
        public category: string,
        public chineseWord: string,
        public englishWords: string[]
    ) {
    }

    printInfo() {
        console.log(this.category, this.chineseWord, this.englishWords)
    }
}