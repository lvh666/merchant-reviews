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
     * @summary 查询订单列表
     * @description 查询订单列表
     * @router post /order/getAllOrder
     * @request body getAllOrderRequest *body
     * @response 200 baseResponse 获取成功
     */
  async getAllOrder() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.order.getAllOrder(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
     * @summary 提现
     * @description 提现
     * @router post /withdraw
     * @request body withdrawRequest *body
     * @response 200 baseResponse 提现成功
     */
  async userWithdraw() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.withdrawRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.order.userWithdraw(payload);
    const msg = res.affectedRows === 1 ? '提现成功' : '提现失败';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res: null, msg });
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
  * @response 200 baseResponse 取消成功
  */
  async cancelOrder() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.orderRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.order.cancelOrder(payload);
    const arr = [ '支付失败', '支付成功', '取消失败', '取消成功' ];
    // 判断注册成功
    let msg = arr[(payload.status - 1) * 2 + res.affectedRows];
    if (payload.flag) msg = '审核成功';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
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
