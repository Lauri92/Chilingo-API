import mongoose from "mongoose";

export const initializeMongoose = async () => {
    if (process.env.MONGOOSECONN) {
        await mongoose.connect(process.env.MONGOOSECONN);
    } else {
        throw new Error("MONGOOSECONN env missing")
    }
}