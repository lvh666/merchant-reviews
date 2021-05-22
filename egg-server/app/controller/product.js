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
    const payload = { id: ctx.query.id };
    // 调用 Service 进行业务处理
    const res = await service.product.getProductById(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 根据用户ID查询所有商品
   * @description 根据用户ID查询所有商品
   * @router get /product/getItem
   * @request body getProductRequest *body
   * @response 200 baseResponse 获取成功
   */
  async getProductByUserId() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.getProductRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    const shops = await service.shop.getShopByUserId(payload);
    const res = [];
    for (const shop of shops) {
      const products = await service.product.getAllProductByShopId({
        shopId: shop.id,
      });
      for (const product of products) {
        product.shop = shop;
        res.push(product);
      }
    }
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 上架优惠商品
   * @description 上架优惠商品
   * @router post /product/addProduct
   * @request body addProductRequest *body
   * @response 200 baseResponse 添加成功
   */
  async addProduct() {
    const { ctx, service } = this;
    console.log(ctx.request.body);
    // 有效性检查
    ctx.validate(ctx.rule.addProductRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.product.addProduct(payload);
    // 判断注册成功
    const msg = res.affectedRows === 1 ? '添加成功' : '添加失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
   * @summary 修改餐馆信息
   * @description 修改餐馆信息
   * @router post /product/changeProduct
   * @request body changeProductRequest *body
   * @response 200 baseResponse 修改成功
   */
  async changeProductItem() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.changeProductRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.product.changeProduct(payload);
    // 判断注册成功
    const msg = res.affectedRows === 1 ? '修改成功' : '修改失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
   * @summary 删除餐馆
   * @description 删除餐馆
   * @router post /product/delProduct
   * @request body delProductRequest *body
   * @response 200 baseResponse 删除成功
   */
  async delProduct() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.delProductRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.product.delProduct(payload);
    const msg = res.affectedRows === 1 ? '删除成功' : '删除失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }
}

module.exports = ProductController;
