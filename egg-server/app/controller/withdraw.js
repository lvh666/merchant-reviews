'use strict';

const Controller = require('egg').Controller;

/**
 * @Controller 提现
 */
class WithdrawController extends Controller {
  /**
     * @summary 获取审核列表
     * @description 获取审核列表
     * @router get /withdraw/getWithdrawList
     * @response 200 baseResponse 获取成功
     */
  async getWithdrawList() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.withdraw.getWithdrawList(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
     * @summary 提现审核
     * @description 提现审核
     * @router get /withdraw/isWithdraw
     * @response 200 baseResponse 审核成功
     */
  async isWithdraw() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.withdraw.isWithdraw(payload);
    // 判断注册成功
    const msg = res.affectedRows === 1 ? '审核成功' : '审核失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }
}

module.exports = WithdrawController;
