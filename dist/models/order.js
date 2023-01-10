"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async currentUserOrder(user_id) {
        const conn = await database_1.default.connect();
        const sql = 'select * from orders where user_id=($1) and status=\'active\'';
        const result = await conn.query(sql, [user_id]);
        conn.release();
        return result.rows[0];
    }
    async completedUserOrders(user_id) {
        const conn = await database_1.default.connect();
        const sql = 'select * from orders where user_id=($1) and status=\'completed\'';
        const result = await conn.query(sql, [user_id]);
        conn.release();
        return result.rows;
    }
}
exports.OrderStore = OrderStore;
