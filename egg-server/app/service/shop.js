'use strict';

const { Service } = require('egg');

class ShopService extends Service {
  /**
   * 获取所有商店
   * @param {*} payload
   * @return
   */
  async getAllShop(payload) {
    const results = await this.app.mysql.select('shop', {
      where: { isReview: 1, isDiscard: 0, region: payload.city },
      limit: payload.pageNum * payload.curPage,
      offset: payload.pageNum,
    });
    return results;
  }

  /**
   * 获取所有商店
   * @param {*} payload
   * @return
   */
  async getShops(payload) {
    const results = await this.app.mysql.select('shop', {
      where: { isDiscard: 0 },
      limit: payload.pageNum * payload.curPage,
      offset: payload.pageNum,
    });
    return results;
  }
  /**
   * 根据用户ID获取所有商店
   * @param {*} payload
   * @return
   */
  async getShopByUserId(payload) {
    const user = await this.app.mysql.get('user', { username: payload.username });
    const results = await this.app.mysql.select('shop', {
      where: { user_id: user.id, isReview: 1, isDiscard: 0 },
      limit: 100,
      offset: 0,
    });
    return results;
  }

  /**
   * 查询餐馆详情
   * @param {*} payload
   * @return
   */
  async getShopById(payload) {
    const res = await this.app.mysql.get('shop', { id: payload.shopId });
    return res;
  }
  /**
   * 模糊查询餐馆
   * @param {*} payload
   * @return
   */
  async searchShop(payload) {
    const sql = `SELECT * FROM shop WHERE shop LIKE "%${payload.keyWords}%" AND region = '${payload.city}' AND isReview = 1 AND isDiscard = 0 LIMIT ${payload.pageNum * payload.curPage}, ${payload.pageNum}`;
    const res = await this.app.mysql.query(sql);
    return res;
  }

  /**
   * 添加推荐菜品
   * @param {*} payload
   * @return
   */
  async addDiscount(payload) {
    const res = await this.app.mysql.insert('discount_product', {
      shop_id: payload.id,
      name: payload.name,
      price: payload.price,
      pic: payload.files[0],
    });
    return res;
  }

  /**
   * 添加餐馆
   * @param {*} payload
   * @return
   */
  async addShop(payload) {
    const user = await this.app.mysql.get('user', { username: payload.username });
    const res = await this.app.mysql.insert('shop', {
      user_id: user.id,
      shop: payload.shop,
      price: payload.price,
      pic: payload.files,
      region: payload.region,
      category: payload.category,
      address: payload.address,
      phone: payload.phone,
      create_time: new Date(),
    });
    return res;
  }

  /**
   * 修改餐馆信息
   * @param {*} payload
   * @return
   */
  async changeShop(payload) {
    const shop = await this.app.mysql.get('shop', { id: payload.id });
    shop.shop = payload.shop;
    shop.price = payload.price;
    shop.pic = payload.files;
    shop.region = payload.region;
    shop.category = payload.category;
    shop.address = payload.address;
    const res = await this.app.mysql.update('shop', shop);
    return res;
  }

  /**
   * 删除餐馆信息
   * @param {*} payload
   * @return
   */
  async delShop(payload) {
    const shop = await this.app.mysql.get('shop', { id: payload.id });
    shop.isDiscard = 1;
    const res = await this.app.mysql.update('shop', shop);
    return res;
  }

  /**
   * 审核餐馆
   * @param {*} payload
   * @return
   */
  async reviewShop(payload) {
    const shop = await this.app.mysql.get('shop', { id: payload.id });
    shop.isReview = payload.type;
    const res = await this.app.mysql.update('shop', shop);
    return res;
  }

  /**
   * 获取所有推荐菜品
   * @param {*} payload
   * @return
   */
  async getAllDiscount(payload) {
    const results = await this.app.mysql.select('discount_product', {
      where: { shop_id: payload.id },
      limit: 100,
      offset: 0,
    });
    return results;
  }

  /**
   * 点赞推荐菜品
   * @param {*} payload
   * @return
   */
  async addDiscountGoods(payload) {
    const discount = await this.app.mysql.get('discount_product', { id: payload.id });
    discount.goods += 1;
    const res = await this.app.mysql.update('discount_product', discount);
    return res;
  }
}

module.exports = ShopService;
