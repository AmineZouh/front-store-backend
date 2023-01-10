import client from "../database";

export type Order = {
    id?:number,
    user_id:number,
    date:string,
    status:string
}

export class OrderStore{
    async currentUserOrder(user_id:number):Promise<Order>{
        const conn = await client.connect()
        const sql = 'select * from orders where user_id=($1) and status=\'active\''
        const result = await conn.query(sql, [user_id])
        conn.release()
        return result.rows[0]
    }

    async completedUserOrders(user_id:number):Promise<Order[]>{
        const conn = await client.connect()
        const sql = 'select * from orders where user_id=($1) and status=\'completed\''
        const result = await conn.query(sql, [user_id])
        conn.release()
        return result.rows
    }


}