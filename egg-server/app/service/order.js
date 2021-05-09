'use strict';

const { Service } = require('egg');

class OrderService extends Service {
  /**
   * 获取订单
   * @param {*} payload
   * @return
   */
  async getAllOrderByUserId(payload) {
    const user = await this.app.mysql.get('user', { username: payload.username });
    const results = await this.app.mysql.select('order', {
      where: { user_id: user.id },
      limit: 100,
      offset: 0,
    });
    for (const result of results) {
      const product = await this.app.mysql.get('product', { id: result.product_id });
      result.product = product;
    }
    return results;
  }
  /**
   * 下单
   * @param {*} payload
   * @return
   */
  async addOrder(payload) {
    const user = await this.app.mysql.get('user', { username: payload.username });
    const res = await this.app.mysql.insert('order', {
      user_id: user.id,
      shop_id: payload.shopId,
      product_id: payload.productId,
      price: payload.price,
      num: payload.num,
      create_time: new Date(payload.createTime),
      pic: payload.pic,
    });

    return res;
  }

  /**
   * 取消订单
   * @param {*} payload
   * @return
   */
  async cancelOrder(payload) {
    const order = await this.app.mysql.get('order', { id: payload.id });
    order.state = 2;
    const res = await this.app.mysql.update('order', order);
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
