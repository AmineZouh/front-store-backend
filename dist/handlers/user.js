"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const token_verification_1 = require("./token_verification");
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
        const user = req.body;
        const createdUser = await store.create(user);
        res.json(createdUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
const user_routes = (app) => {
    app.get('/users', token_verification_1.verifyToken, index);
    app.post('/users', token_verification_1.verifyToken, create);
    app.get('/users/:id', token_verification_1.verifyToken, show);
};
exports.default = user_routes;
