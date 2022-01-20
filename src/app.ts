import express, {Request, Response, NextFunction} from "express"
import {json, urlencoded} from "body-parser";
import dotenv from "dotenv"

dotenv.config()
import wordsRoute from "./routes/wordsRoute";
import {launchApplication} from "./utils/utils";


const app = express()
app.use(json())
app.use(urlencoded({extended: true}))

app.use("/words", wordsRoute)

// Default error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({message: "Something went wrong!"})
})

launchApplication(app)
