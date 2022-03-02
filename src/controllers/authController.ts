import {RequestHandler} from "express";
import {chilingoUserModel} from "../mongoDB/userSchema";
import bcrypt from "bcryptjs";
import {ChilingoUser} from "../mongoDB/userSchema";

export const testRegistration: RequestHandler = async (req, res) => {
    res.status(200).send({message: 'Testing register route'});
};

export const createUser: RequestHandler = async (req, res) => {

    try {
        const {username, password} = (req.body as { username: string, password: string })
        const isDuplicate = await chilingoUserModel.findOne({username: username})

        if (isDuplicate === null) {
            const salt = await bcrypt.genSalt(10)
            const saltHashedPassword = await bcrypt.hash(password, salt)
            const newUser: ChilingoUser =
                {username: username, password: saltHashedPassword, reviewableWords: [], learnedWords: []}
            const insertedUser = await chilingoUserModel.create(newUser)
            res.status(200).json({message: `Inserter new user: ${insertedUser.username}`})
        } else {
            res.status(400).json({message: `Username already exists!`})
        }
    } catch (e: any) {
        console.log(e.message)
        res.status(400).json({message: `Unexpected error happened while creating user!`})
    }

}