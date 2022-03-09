import {Router} from "express";
import {createUser, login, testRegistration} from "../controllers/authController";

const router = Router()

router.route("/register")
    .get(testRegistration)
    .post(createUser)

router.route("/login")
    .get(login)

export default router