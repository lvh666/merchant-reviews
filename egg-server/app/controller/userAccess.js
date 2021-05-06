'use strict';
const { Controller } = require('egg');

/**
 *  @Controller 用户鉴权
 */
class UserAccessController extends Controller {
  /**
     * @summary 用户登录
     * @description 用户登录
     * @router post /login
     * @request body loginRequest *body
     * @response 200 baseResponse 创建成功
     */
  async login() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(ctx.rule.loginRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.userAccess.login(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserAccessController;
