import {Router} from "express";
import {deleteWord, getWords, getWordsByCategory, insertWord} from "../controllers/wordsController";

const router = Router()

router.route("/").post(insertWord).get(getWords)

router.route("/category/:category").get(getWordsByCategory)

router.route("/modify/:id").delete(deleteWord)

export default router