import {Router} from "express";
import {getWords, getWordsByCategory, insertWord} from "../controllers/wordsController";

const router = Router()

router.route("/").post(insertWord).get(getWords)

router.route("/category/:category").get(getWordsByCategory)

export default router