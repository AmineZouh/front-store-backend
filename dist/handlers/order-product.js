"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_product_1 = require("../models/order-product");
const store = new order_product_1.OrderProductStore();
const addProduct = async (_req, res) => {
    const orderId = parseInt(_req.params.id);
    const orderProduct = _req.body;
    orderProduct.order_id = orderId;
    try {
        const addedProduct = await store.addProduct(orderProduct);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_product_routes = (app) => {
    app.post('/orders/:id/products', addProduct);
};
exports.default = order_product_routes;
