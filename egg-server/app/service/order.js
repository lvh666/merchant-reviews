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
   * 获取订单
   * @param {*} payload
   * @return
   */
  async getAllOrder(payload) {
    const results = await this.app.mysql.select('order', {
      limit: payload.pageNum * payload.curPage,
      offset: payload.pageNum,
    });
    for (const result of results) {
      const product = await this.app.mysql.get('product', { id: result.product_id });
      result.product = product;
    }
    return results;
  }

  /**
   * 提现
   * @param {*} payload
   * @return
   */
  async userWithdraw(payload) {
    const user = await this.app.mysql.get('user', { username: payload.username });
    const results = await this.app.mysql.insert('withdraw', {
      user_id: user.id,
      name: payload.name,
      paypal: payload.paypalName,
    });
    return results;
  }

  /**
   * 下单
   * @param {*} payload
   * @return
   */
  async addOrder(payload) {
    const user = await this.app.mysql.get('user', { username: payload.username });
    const product = await this.app.mysql.get('product', { id: payload.productId });
    product.sale_num += 1;
    await this.app.mysql.update('product', product);
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
    order.state = payload.status;
    if (order.state === 1 && !payload.flag) {
      const shop = await this.app.mysql.get('shop', { id: order.shop_id });
      const user = await this.app.mysql.get('user', { id: shop.user_id });
      user.money += (order.num * order.price).toFixed(2);
      await this.app.mysql.update('user', user);
    }
    if (order.state === 3) {
      const shop = await this.app.mysql.get('shop', { id: order.shop_id });
      const shopUser = await this.app.mysql.get('user', { id: shop.user_id });
      shopUser.money -= +(order.num * order.price).toFixed(2);
      await this.app.mysql.update('user', shopUser);

      const user = await this.app.mysql.get('user', { id: order.user_id });
      user.money += +(order.num * order.price).toFixed(2);
      await this.app.mysql.update('user', user);
    }
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
