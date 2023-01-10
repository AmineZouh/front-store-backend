"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const token_verification_1 = require("./token_verification");
const store = new order_1.OrderStore();
async function getCurrentOrder(req, res) {
    const id = req.params.user_id;
    const order = await store.currentUserOrder(parseInt(id));
    res.json(order);
}
async function getCompletedOrder(req, res) {
    const id = req.params.user_id;
    const orders = await store.completedUserOrders(parseInt(id));
    res.json(orders);
}
const order_routes = (app) => {
    app.get('/orders/active/:user_id', token_verification_1.verifyToken, getCurrentOrder);
    app.get('/orders/completed/:user_id', token_verification_1.verifyToken, getCompletedOrder);
};
exports.default = order_routes;
