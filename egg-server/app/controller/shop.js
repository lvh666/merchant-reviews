'use strict';
const { Controller } = require('egg');

/**
 *  @Controller 餐馆
 */
class ShopController extends Controller {

  /**
     * @summary 分页查询所有餐馆
     * @description 分页查询所有餐馆
     * @router get /getAllShop
     * @request query number curPage 当前页
     * @request query number pageNum 个/页
     * @response 200 baseResponse 获取成功
     */
  async getAllShop() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { curPage: +ctx.query.curPage || 0, pageNum: +ctx.query.pageNum || 10 };
    // 调用 Service 进行业务处理
    const res = await service.shop.getAllShop(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
     * @summary 分页查询所有餐馆
     * @description 分页查询所有餐馆
     * @router get /shop/getItem
     * @request body getShopRequest *body
     * @response 200 baseResponse 获取成功
     */
  async getShopByUserId() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.getShopRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.shop.getShopByUserId(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
  * @summary 查询餐馆详情
  * @description 查询餐馆详情
  * @router get /getShopById
  * @request query string shopId 餐馆ID
  * @response 200 baseResponse 获取成功
  */
  async getShopById() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { shopId: +ctx.query.id };
    // 调用 Service 进行业务处理
    const res = await service.shop.getShopById(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
  * @summary 模糊查询餐馆
  * @description 模糊查询餐馆
  * @router get /searchShop
  * @request query string keyWords 关键字
  * @response 200 baseResponse 获取成功
  */
  async searchShop() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { keyWords: ctx.query.keyWords, curPage: +ctx.query.curPage || 0, pageNum: +ctx.query.pageNum || 10 };
    // 调用 Service 进行业务处理
    const res = await service.shop.searchShop(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
  * @summary 添加推荐菜品
  * @description 添加推荐菜品
  * @router post /shop/addDiscount
  * @request body addDiscountRequest *body
  * @response 200 baseResponse 添加成功
  */
  async addDiscount() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.addDiscountRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.shop.addDiscount(payload);
    // 判断注册成功
    const msg = res.affectedRows === 1 ? '添加成功' : '添加失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
  * @summary 商家入驻
  * @description 商家入驻
  * @router post /shop/addShop
  * @request body addShopRequest *body
  * @response 200 baseResponse 添加成功
  */
  async addShop() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.addShopRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.shop.addShop(payload);
    // 判断注册成功
    const msg = res.affectedRows === 1 ? '添加成功' : '添加失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
  * @summary 修改商家
  * @description 商家入驻
  * @router post /shop/changeShop
  * @request body changeShopRequest *body
  * @response 200 baseResponse 修改成功
  */
  async changeShopItem() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.changeShopRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.shop.changeShop(payload);
    // 判断注册成功
    const msg = res.affectedRows === 1 ? '修改成功' : '修改失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
     * @summary 查询所有推荐菜品
     * @description 查询所有推荐菜品
     * @router get /getAllDiscount
     * @request query number id 餐馆ID
     * @response 200 baseResponse 获取成功
     */
  async getAllDiscount() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { id: +ctx.query.id };
    // 调用 Service 进行业务处理
    const res = await service.shop.getAllDiscount(payload);
    const ans = res ? [].concat(res) : null;
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res: ans });
  }

  /**
     * @summary 点赞推荐菜品
     * @description 点赞推荐菜品
     * @router post /shop/goodsDiscount
     * @request body goodsDiscountRequest *body
     * @response 200 baseResponse 点赞成功
     */
  async addDiscountGoods() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.goodsDiscountRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.shop.addDiscountGoods(payload);
    const msg = res.affectedRows === 1 ? '点赞成功' : '点赞失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
     * @summary 删除餐馆
     * @description 删除餐馆
     * @router post /shop/delShop
     * @request body delShopRequest *body
     * @response 200 baseResponse 删除成功
     */
  async delShop() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.delShopRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.shop.delShop(payload);
    const msg = res.affectedRows === 1 ? '删除成功' : '删除失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }
}

module.exports = ShopController;
