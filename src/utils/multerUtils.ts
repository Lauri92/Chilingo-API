import multer from "multer";
import {RequestHandler} from "express";

export const uploadSingle = multer({
    dest: './uploads',
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            return cb(null, true);
        } else {
            console.log("Not an image")
            return cb(null, false);
        }
    }
});

export const injectFile: RequestHandler = (req, res, next) => {
    if (req.file) {
        req.body.type = req.file.mimetype;
        req.body.imageURL = req.file.filename
        next()
    } else {
        res.status(400).send({message: "Provide a valid image"})
    }
};