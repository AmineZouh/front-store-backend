"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database"));
dotenv_1.default.config();
const salt_round = process.env.SALT_ROUNDS;
class UserStore {
    async index() {
        const conn = await database_1.default.connect();
        const sql = 'select * from users';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async show(id) {
        const conn = await database_1.default.connect();
        const sql = 'select * from users where id=($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
    async create(user) {
        const conn = await database_1.default.connect();
        const sql = 'insert into users(first_name, last_name, password) values ($1, $2, $3) returning *';
        const salt = await bcrypt_1.default.genSalt(parseInt(salt_round));
        const hashedPass = await bcrypt_1.default.hash(user.password, salt);
        const result = await conn.query(sql, [user.first_name, user.last_name, hashedPass]);
        conn.release();
        return result.rows[0];
    }
}
exports.UserStore = UserStore;
