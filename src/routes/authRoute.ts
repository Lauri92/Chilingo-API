import {Router} from "express";
import {createUser, testRegistration} from "../controllers/authController";

const router = Router()

router.route("/register")
    .get(testRegistration)
    .post(createUser)

export default router