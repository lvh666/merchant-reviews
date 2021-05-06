'use strict';
const { Controller } = require('egg');

/**
 *  @Controller 订单
 */
class OrderController extends Controller {

  /**
     * @summary 根据用户ID查询订单
     * @description 根据用户ID查询订单
     * @router post /getAllOrderByUserId
     * @request body getAllOrderRequest *body
     * @response 200 baseResponse 获取成功
     */
  async getAllOrderByUserId() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.getAllOrderRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.order.getAllOrderByUserId(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
  * @summary 下单
  * @description 下单
  * @router post /order/Item
  * @request body addOrderRequest *body
  * @response 200 baseResponse 获取成功
  */
  async addOrder() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.addOrderRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.order.addOrder(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
  * @summary 取消订单
  * @description 取消订单
  * @router delete /order/Item
  * @request body orderRequest *body
  * @response 200 baseResponse 获取成功
  */
  async cancelOrder() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.orderRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.order.cancelOrder(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
     * @summary 根据ID查询订单
     * @description 根据ID查询订单
     * @router post /getOrderById
     * @request body orderRequest *body
     * @response 200 baseResponse 获取成功
     */
  async getOrderById() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.orderRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.order.getOrderById(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}

module.exports = OrderController;
