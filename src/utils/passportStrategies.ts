import passport from "passport"
import passportLocal from "passport-local"
import passportJWT from "passport-jwt"
import JWTStrategy from "passport-jwt"
import {ExtractJwt} from "passport-jwt";
import {ChilingoUser, chilingoUserModel} from "../mongoDB/userSchema";
import bcrypt from "bcryptjs"
import {Types, Document} from "mongoose";

const LocalStrategy = passportLocal.Strategy

export default passport.use(new LocalStrategy(
    async (
        username: string,
        password: any,
        done: (arg0: null,
               arg1: boolean | Document<unknown, any, ChilingoUser> & ChilingoUser & { _id: Types.ObjectId },
               arg2: { message: string } | undefined) => any) => {
        try {
            username = username.toLowerCase()
            // Search for user from database with given username
            const user = await chilingoUserModel.findOne(
                {username: `${username}`})
            if (user === null) {
                // No user found
                return done(null, false, {message: 'Username or password incorrect'})
            }
            // Test string provided in password against hash
            const isSync = await (bcrypt.compareSync(password, user.password))
            if (!isSync) {
                // Provided pw doesn't match the hash
                return done(null, false, {message: 'Username or password incorrect'})
            }
            // was match
            return done(null, user, {message: "Was a match"});
        } catch (e: any) {
            console.log('catch error', e.message)
        }
    }))