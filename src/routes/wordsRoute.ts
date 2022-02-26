import {Router} from "express";
import {deleteWord, getWords, getWordsByCategory, insertWord} from "../controllers/wordsController";
import {injectFile, uploadSingle} from "../utils/multerUtils";

const router = Router()

router.route("/")
    .post(uploadSingle.single("wordImage"), injectFile, insertWord)
    .get(getWords)

router.route("/category/:category").get(getWordsByCategory)

router.route("/modify/:id").delete(deleteWord)

export default router