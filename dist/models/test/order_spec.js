"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const store = new order_1.OrderStore();
describe('Test of order model', () => {
    it('completedUserOrders method should be defined', () => {
        expect(store.completedUserOrders).toBeDefined();
    });
    it('completedUserOrders should return a list of completed user\'orders', async () => {
        const order = { id: 1, user_id: 1, date: '01-06-2023', status: 'completed' };
        const result = await store.completedUserOrders(1);
        expect(result).toEqual([order]);
    });
    it('currentUserOrder method should be defined', () => {
        expect(store.currentUserOrder).toBeDefined();
    });
    it('currentUserOrder should return a list of completed user\'orders', async () => {
        const order = { id: 2, user_id: 1, date: '23-05-2023', status: 'active' };
        const result = await store.currentUserOrder(1);
        expect(result).toEqual(order);
    });
});
