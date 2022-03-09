import {RequestHandler} from "express";
import {chilingoUserModel} from "../mongoDB/userSchema";
import bcrypt from "bcryptjs";
import {ChilingoUser} from "../mongoDB/userSchema";
import jwt from "jsonwebtoken"
import passport from "passport";

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

export const login: RequestHandler = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).send(`${info.message}`)
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.status(400).send({message: "Error logging in."})
            }
            const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT!!)
            return res.status(200).json({message: token})
        });
    })(req, res);
}