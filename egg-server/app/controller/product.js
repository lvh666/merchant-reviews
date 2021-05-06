'use strict';
const { Controller } = require('egg');

/**
 *  @Controller 商品
 */
class ProductController extends Controller {

  /**
     * @summary 查询餐馆所有商品
     * @description 查询餐馆所有商品
     * @router get /getAllProductByShopId
     * @request query string shopId 餐馆ID
     * @response 200 baseResponse 获取成功
     */
  async getAllProductByShopId() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { shopId: ctx.query.shopId };
    // 调用 Service 进行业务处理
    const res = await service.product.getAllProductByShopId(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
  * @summary 查询商品详情
  * @description 查询商品详情
  * @router get /getProductById
  * @request query string productId 商品ID
  * @response 200 baseResponse 获取成功
  */
  async getProductById() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { id: ctx.query.productId };
    // 调用 Service 进行业务处理
    const res = await service.product.getProductById(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}

module.exports = ProductController;
