import client from "../database"


export type OrderProduct = {
    id?: number,
    order_id?:number,
    product_id:number,
    quantity: number
}




export class OrderProductStore{
        async addProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
        try {
          const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await client.connect()
    
          const result = await conn
              .query(sql, [orderProduct.order_id, orderProduct.product_id, orderProduct.quantity])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
          throw new Error(`Could not add product ${orderProduct.product_id} to order ${orderProduct.order_id}: ${err}`)
        }
    }
}
