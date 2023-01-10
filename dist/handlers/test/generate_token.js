"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenSecret = process.env.TOKEN_SECRET;
function generate_token() {
    const user = { id: 1, first_name: 'Mohamed', last_name: 'Zouhairi', password: 'mohamed123' };
    const token = jsonwebtoken_1.default.sign({ user: user }, tokenSecret);
    return token;
}
exports.default = generate_token;
