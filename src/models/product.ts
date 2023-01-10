import client from "../database"


export type Product = {
    id?:number,
    name:string,
    category:string,
    price:number,
    number_sells: number
}


export class ProductStore{

    async index():Promise<Product[]>{
        try {
            const conn = await client.connect()
            const sql = 'select * from products'
            const result = await conn.query(sql)
            conn.release()
            return ((result.rows as unknown) as Product[])
        } catch (error) {
            throw new Error(`Could not get data, ${error}`)
        }

    }

    async show(id:number):Promise<Product>{
        try {
            const conn = await client.connect()
            const sql = 'select * from products where id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not get data, ${error}`)
        }
        
    }
    
    async create(product:Product):Promise<Product>{
        const conn = await client.connect()
        const sql = 'insert into products(name, category, price, number_sells) values($1, $2, $3, $4) returning *'
        const result = await conn.query(sql, [product.name, product.category, product.price, product.number_sells])
        conn.release()
        return result.rows[0]
    }

    async topFivePopular():Promise<Product[]>{
        try {
            const conn = await client.connect()
            const sql = 'select * from products order by number_sells desc limit 5'
            const result = await conn.query(sql)
            conn.release()
            return result.rows as unknown as Product[]
        } catch (error) {
            throw new Error(`Could not get data, ${error}`)
        }

    }

    async filterByCategory(category:string):Promise<Product[]>{
        try {
             const conn = await client.connect()
            const sql = 'select * from products where category=($1)'
            const result = await conn.query(sql, [category])
            conn.release()
            return result.rows as unknown as Product[]
        } catch (error) {
            throw new Error(`Could not get data, ${error}`)
        }
    }
}






