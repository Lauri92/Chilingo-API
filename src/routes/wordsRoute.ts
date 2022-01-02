import {Router} from "express";
import {insertWord} from "../controllers/wordsController";

const router = Router()

router.route("/").post(insertWord)

export default router