"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const token_verification_1 = require("./token_verification");
const store = new product_1.ProductStore();
async function index(req, res) {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
    }
}
async function show(req, res) {
    try {
        const id = req.params.id;
        const product = await store.show(parseInt(id));
        res.json(product);
    }
    catch (error) {
        res.status(400);
    }
}
async function create(req, res) {
    try {
        const product = req.body;
        const createdProduct = await store.create(product);
        res.json(createdProduct);
    }
    catch (error) {
        res.status(400);
    }
}
async function topFivePopular(_req, res) {
    try {
        const products = await store.topFivePopular();
        res.json(products);
    }
    catch (error) {
        res.status(400);
    }
}
async function filterByCategory(req, res) {
    try {
        const category = req.params.category;
        const products = await store.filterByCategory(category);
        res.json(products);
    }
    catch (error) {
        res.status(400);
    }
}
const products_routes = (app) => {
    app.get('/products', index);
    app.post('/products', token_verification_1.verifyToken, create);
    app.get('/products/topfivepopular', topFivePopular);
    app.get('/products/:id', show);
    app.get('/products/category/:category', filterByCategory);
};
exports.default = products_routes;
