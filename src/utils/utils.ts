import mongoose from "mongoose";

export const initializeMongoose = async () => {
    try {
        if (process.env.MONGOOSECONN) {
            await mongoose.connect(process.env.MONGOOSECONN).then(() => {
                const d = new Date();
                console.log(
                    `Started on localhost @ ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
            })
        }
    } catch (e: any) {
        console.log(e.message)
        initializeMongoose()
    }
}