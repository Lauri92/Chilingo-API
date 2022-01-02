import express, {Request, Response, NextFunction} from "express"
import {json, urlencoded} from "body-parser";

const app = express()

app.use(json())

app.use(urlencoded({extended: true}))

app.use("/words")

// Default error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({message: "Something went wrong!"})
})

app.listen(3000)
