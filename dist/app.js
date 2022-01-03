"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const wordsRoute_1 = __importDefault(require("./routes/wordsRoute"));
const utils_1 = require("./utils/utils");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/words", wordsRoute_1.default);
// Default error handling
app.use((err, req, res, next) => {
    res.status(400).json({ message: "Something went wrong!" });
});
(0, utils_1.initializeMongoose)(app);
