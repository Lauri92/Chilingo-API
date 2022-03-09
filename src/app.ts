import express, {Request, Response, NextFunction} from "express"
import {json, urlencoded} from "body-parser";
import dotenv from "dotenv"

dotenv.config()
import wordsRoute from "./routes/wordsRoute";
import authRoute from "./routes/authRoute"
import {launchApplication} from "./utils/utils";
import passport from "./utils/passportStrategies";


const app = express()
// Add middlewares to the app router
app.use(json())
app.use(urlencoded({extended: true}))
app.use(passport.initialize())


app.use("/auth", authRoute)
app.use("/words", passport.authenticate("jwt", {session: false}), wordsRoute)

// Default error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({message: "Something went wrong!"})
})

launchApplication(app)
