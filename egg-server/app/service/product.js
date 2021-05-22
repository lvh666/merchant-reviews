'use strict';

const { Service } = require('egg');

class ProductService extends Service {
  /**
   * 获取餐馆所有商品
   * @param {*} payload
   * @return
   */
  async getAllProductByShopId(payload) {
    const results = await this.app.mysql.select('product', {
      where: { shop_id: payload.shopId, isDiscard: 0 },
      limit: 100,
      offset: 0,
    });
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

  /**
   * 上架商品
   * @param {*} payload
   * @return
   */
  async addProduct(payload) {
    const res = await this.app.mysql.insert('product', {
      shop_id: payload.shopId,
      product: payload.product,
      current_price: payload.currentPrice,
      old_price: payload.oldPrice,
      sale_desc: payload.saleDesc,
      picture: payload.files,
      tag: payload.tag,
      start_time: new Date(payload.startTime),
      end_time: new Date(payload.endTime),
      create_time: new Date(),
    });
    return res;
  }

  /**
   * 修改商品信息
   * @param {*} payload
   * @return
   */
  async changeProduct(payload) {
    const product = await this.app.mysql.get('product', { id: payload.id });
    product.product = payload.product;
    product.current_price = payload.currentPrice;
    product.picture = payload.files;
    product.old_price = payload.oldPrice;
    product.sale_desc = payload.saleDesc;
    product.tag = payload.tag;
    product.start_time = new Date(payload.startTime);
    product.end_time = new Date(payload.endTime);
    const res = await this.app.mysql.update('product', product);
    return res;
  }

  /**
   * 删除商品信息
   * @param {*} payload
   * @return
   */
  async delProduct(payload) {
    const product = await this.app.mysql.get('product', { id: payload.id });
    product.isDiscard = 1;
    const res = await this.app.mysql.update('product', product);
    return res;
  }
}

module.exports = ProductService;
