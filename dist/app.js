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
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const utils_1 = require("./utils/utils");
const passportStrategies_1 = __importDefault(require("./utils/passportStrategies"));
const app = (0, express_1.default)();
// Add middlewares to the app router
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use(passportStrategies_1.default.initialize());
app.use("/auth", authRoute_1.default);
app.use("/words", passportStrategies_1.default.authenticate("jwt", { session: false }), wordsRoute_1.default);
// Default error handling
app.use((err, req, res, next) => {
    res.status(400).json({ message: "Something went wrong!" });
});
(0, utils_1.launchApplication)(app);
