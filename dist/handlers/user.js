"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const token_verification_1 = require("./token_verification");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
async function index(req, res) {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
async function show(req, res) {
    try {
        const id = req.params.id;
        const user = await store.show(parseInt(id));
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
async function create(req, res) {
    try {
        const secret = process.env.TOKEN_SECRET;
        const user = req.body;
        const createdUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: createdUser }, secret);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
const user_routes = (app) => {
    app.get('/users', token_verification_1.verifyToken, index);
    app.post('/users', create);
    app.get('/users/:id', token_verification_1.verifyToken, show);
};
exports.default = user_routes;
