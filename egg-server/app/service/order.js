'use strict';

const { Service } = require('egg');

class OrderService extends Service {
  /**
   * 获取订单
   * @param {*} payload
   * @return
   */
  async getAllOrderByUserId(payload) {
    const results = await this.app.mysql.get('order', { user_id: payload.userId });
    return results;
  }
  /**
   * 下单
   * @param {*} payload
   * @return
   */
  async addOrder(payload) {
    const res = await this.app.mysql.insert('order', {
      user_id: payload.userId,
      shop_id: payload.shopId,
      product_id: payload.peoductId,
      price: payload.price,
    });
    return res;
  }

  /**
   * 取消订单
   * @param {*} payload
   * @return
   */
  async cancelOrder(payload) {
    const res = await this.app.mysql.delete('order', payload);
    return res;
  }

  /**
   * 获取订单详情
   * @param {*} payload
   * @return
   */
  async getOrderById(payload) {
    const res = await this.app.mysql.get('order', payload);
    return res;
  }
}

module.exports = OrderService;
