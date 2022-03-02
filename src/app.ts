import express, {Request, Response, NextFunction} from "express"
import {json, urlencoded} from "body-parser";
import dotenv from "dotenv"

dotenv.config()
import wordsRoute from "./routes/wordsRoute";
import registerRoute from "./routes/authRoute"
import {launchApplication} from "./utils/utils";
import passport from "passport";


const app = express()
// Add middlewares to the app router
app.use(json())
app.use(urlencoded({extended: true}))
app.use(passport.initialize())


app.use("/words", wordsRoute)
app.use("/auth", registerRoute)

// Default error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({message: "Something went wrong!"})
})

launchApplication(app)
