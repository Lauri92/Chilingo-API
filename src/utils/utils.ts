import mongoose from "mongoose";
import {Express} from "express";

export const launchApplication = async (app: Express) => {
    try {
        const PORT = process.env.PORT;
        const ENVIRONMENT = process.env.NODE_ENV;
        const CONNECTION = process.env.MONGOOSECONN
        if (ENVIRONMENT && CONNECTION && PORT) {
            await connectMongooseAndListen(app, PORT, ENVIRONMENT, CONNECTION)
        } else {
            throw new Error("Failed to launch app, check environment variables")
        }
    } catch (e: any) {
        console.log(e.message)
        //await initializeMongoose(app)
    }
}

const connectMongooseAndListen = async (app: Express, port: string, environment: string, connection: string) => {
    await mongoose.connect(connection).then(() => {
        app.listen(port)
        const d = new Date();
        console.log(
            `Started on ${environment} @ Port ${port} @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
    })
}