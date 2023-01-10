"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get data, ${error}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from products where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get data, ${error}`);
        }
    }
    async create(product) {
        const conn = await database_1.default.connect();
        const sql = 'insert into products(name, category, price, number_sells) values($1, $2, $3, $4) returning *';
        const result = await conn.query(sql, [product.name, product.category, product.price, product.number_sells]);
        conn.release();
        return result.rows[0];
    }
    async topFivePopular() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from products order by number_sells desc limit 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get data, ${error}`);
        }
    }
    async filterByCategory(category) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from products where category=($1)';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get data, ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
