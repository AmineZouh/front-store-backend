"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.TOKEN_SECRET;
async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
exports.verifyToken = verifyToken;
