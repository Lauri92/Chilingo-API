import mongoose from "mongoose";
import {Express} from "express";

export const initializeMongoose = async (app: Express) => {
    try {
        if (process.env.MONGOOSECONN) {
            await mongoose.connect(process.env.MONGOOSECONN).then(() => {
                app.listen(3000)
                const d = new Date();
                console.log(
                    `Started on localhost @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            })
        }
    } catch (e: any) {
        console.log(e.message)
        await initializeMongoose(app)
    }
}