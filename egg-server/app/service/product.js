'use strict';

const { Service } = require('egg');

class ProductService extends Service {
  /**
   * 获取餐馆所有商品
   * @param {*} payload
   * @return
   */
  async getAllProductByShopId(payload) {
    const results = await this.app.mysql.get('product', { shop_id: payload.shopId });
    return results;
  }
  /**
   * 查询商品详情
   * @param {*} payload
   * @return
   */
  async getProductById(payload) {
    const res = await this.app.mysql.get('product', { id: payload.id });
    return res;
  }
}

module.exports = ProductService;
