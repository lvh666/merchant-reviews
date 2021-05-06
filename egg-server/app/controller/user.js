'use strict';

const { Controller } = require('egg');

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  /**
   * @summary 注册
   * @description 注册
   * @router post /registered
   * @request body registeredRequest *body
   * @response 200 baseResponse 注册成功
   */
  async registered() {
    const { ctx } = this;
    // 有效性检查
    ctx.validate(ctx.rule.registeredRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用service
    const res = await ctx.service.user.registered(payload);
    // 判断注册成功
    const msg = res.affectedRows === 1 ? '注册成功' : '注册失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
   * @summary 获取用户信息
   * @description 获取用户信息
   * @router post /user/getItem
   * @request body checkPhoneRequest *body
   * @response 200 baseResponse 注册成功
   */
  async getItem() {
    const { ctx } = this;
    // 有效性检查
    ctx.validate(ctx.rule.checkPhoneRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用service
    const res = await ctx.service.user.getItem(payload);
    // 正常应答
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 验证手机号是否注册
   * @description 验证手机号是否注册
   * @router post /checkPhone
   * @request body checkPhoneRequest *body
   * @response 200 baseResponse 手机号未注册
   */
  async checkPhone() {
    const { ctx } = this;
    // 有效性检查
    ctx.validate(ctx.rule.checkPhoneRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用service
    const res = await ctx.service.user.checkPhone(payload);
    // 判断注册成功
    const msg = res === 1 ? '手机号已注册' : '手机号未注册';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
   * @summary 修改密码
   * @description 修改密码
   * @router post /user/changePassword
   * @request body loginRequest *body
   * @response 200 baseResponse 登录成功
   */
  async changePassword() {
    const { ctx } = this;
    // 有效性检查
    ctx.validate(ctx.rule.loginRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用service
    const res = await ctx.service.user.changePassword(payload);
    const msg = res.affectedRows === 1 ? '修改成功' : '修改失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
   * @summary 修改用户信息
   * @description 修改用户信息
   * @router post /user/changeItem
   * @request body changeRequest *body
   * @response 200 baseResponse 登录成功
   */
  async changeUser() {
    const { ctx } = this;
    // 有效性检查
    ctx.validate(ctx.rule.changeRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用service
    const res = await ctx.service.user.changeUser(payload);
    const msg = res.affectedRows === 1 ? '修改成功' : '修改失败';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }
}

module.exports = UserController;
