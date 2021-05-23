'use strict';
const { Controller } = require('egg');
const path = require('path');
/**
 *  @Controller 评论
 */
class CommentController extends Controller {

  /**
     * @summary 根据餐馆ID查询评论
     * @description 根据餐馆ID查询评论
     * @router get /getAllCommentByShopId
     * @request query string shopId 餐馆ID
     * @response 200 baseResponse 获取成功
     */
  async getAllCommentByShopId() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { shopId: ctx.query.shopId };
    // 调用 Service 进行业务处理
    const res = await service.comment.getAllCommentByShopId(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
     * @summary 查询所有评论
     * @description 查询所有评论
     * @router post /comment/getAllComment
     * @response 200 baseResponse 获取成功
     */
  async getAllComment() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const { results, total } = await service.comment.getAllComment(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res: { comments: results, total } });
  }

  /**
     * @summary 根据用户ID查询评论
     * @description 根据用户ID查询评论
     * @router post /getAllCommentByUserId
     * @request body checkCommentRequest *body
     * @response 200 baseResponse 获取成功
     */
  async getAllCommentByUserId() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.checkCommentRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.comment.getAllCommentByUserId(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
     * @summary 查询评论
     * @description 根查询评论
     * @router post /getComment
     * @request query number id ID
     * @response 200 baseResponse 获取成功
     */
  async getComment() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { id: +ctx.query.id };
    // 调用 Service 进行业务处理
    const res = await service.comment.getComment(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  /**
  * @summary 添加评论
  * @description 添加评论
  * @router post /comment/Item
  * @request body addCommentRequest *body
  * @response 200 baseResponse 获取成功
  */
  async addComment() {
    const { ctx, service } = this;
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.comment.addComment(payload);
    const msg = res.affectedRows === 1 ? '添加成功' : '添加失败';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
  * @summary 取消评论
  * @description 取消评论
  * @router delete /comment/Item
  * @request query string commentId 评论ID
  * @response 200 baseResponse 取消成功
  */
  async cancelComment() {
    const { ctx, service } = this;
    // 组装参数
    const payload = { id: +ctx.query.id };
    // 调用 Service 进行业务处理
    const res = await service.comment.cancelComment(payload);
    const msg = res.affectedRows === 1 ? '取消成功' : '取消失败';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
  * @summary 更新评论
  * @description 更新评论
  * @router put /comment/Item
  * @request body updateCommentRequest *body
  * @response 200 baseResponse 更新成功
  */
  async updateComment() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.updateCommentRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.comment.updateComment(payload);
    const msg = res.affectedRows === 1 ? '更新成功' : '更新失败';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
  * @summary 更新评论点赞数
  * @description 更新评论点赞数
  * @router put /comment/addGoods
  * @request body addCommentGoodsRequest *body
  * @response 200 baseResponse 更新成功
  */
  async addCommentGoods() {
    const { ctx, service } = this;
    // 有效性检查
    ctx.validate(ctx.rule.addCommentGoodsRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.comment.addCommentGoods(payload);
    const msg = res.affectedRows === 1 ? '更新成功' : '更新失败';
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res: null, msg });
  }

  /**
  * @summary 上传图片
  * @description 上传图片
  * @router post /updatePic
  * @response 200 baseResponse 获取成功
  */
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = 'egg-multipart-test/' + path.basename(file.filename);
    let result;
    try {
      // process file or upload to cloud storage
      result = await ctx.service.tools.getUploadFile(name, file.filepath);
    } finally {
      ctx.cleanupRequestFiles();
    }
    ctx.body = {
      data: {
        url: this.ctx.origin + result.path.slice(3).replace(/\\/g, '/'),
      },
    };
  }

  /**
   * @summary 验证用户是否评论过
   * @description 验证用户是否评论过
   * @router post /comment/checkComment
   * @request body checkCommentRequest *body
   * @response 200 baseResponse 用户未评论
   */
  async CheckComment() {
    const { ctx } = this;
    // 有效性检查
    ctx.validate(ctx.rule.checkCommentRequest);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用service
    const res = await ctx.service.comment.CheckComment(payload);
    // 判断注册成功
    const msg = res === 1 ? '用户已评论' : '用户未评论';
    // 正常应答
    ctx.helper.success({ ctx, res: null, msg });
  }
}

module.exports = CommentController;
