import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import client from "../database";


dotenv.config()


const salt_round = (process.env.SALT_ROUNDS as unknown) as string

export type User = {
    id?:number,
    first_name:string,
    last_name:string,
    password:string,
}

export class UserStore{
    async index():Promise<User[]>{
        const conn = await client.connect()
        const sql = 'select * from users'
        const result = await conn.query(sql)
        conn.release()
        return ((result.rows as unknown) as User[])
    }
    
    async show(id:number):Promise<User>{
        const conn = await client.connect()
        const sql = 'select * from users where id=($1)'
        const result = await conn.query(sql, [id])
        conn.release()
        return result.rows[0]
    }

    async create(user:User):Promise<User>{
        const conn = await client.connect();
        const sql = 'insert into users(first_name, last_name, password) values ($1, $2, $3) returning *'
        const salt = await bcrypt.genSalt(parseInt(salt_round))
        const hashedPass = await bcrypt.hash(user.password, salt);
        const result = await conn.query(sql, [user.first_name, user.last_name, hashedPass])
        conn.release()
        return result.rows[0]
    }
}