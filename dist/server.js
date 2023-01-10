"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./handlers/product"));
const user_1 = __importDefault(require("./handlers/user"));
const order_1 = __importDefault(require("./handlers/order"));
const order_product_1 = __importDefault(require("./handlers/order-product"));
const app = (0, express_1.default)();
const address = "localhost:3000";
app.use(body_parser_1.default.json());
(0, product_1.default)(app);
(0, user_1.default)(app);
(0, order_1.default)(app);
(0, order_product_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
