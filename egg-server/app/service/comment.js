'use strict';

const { Service } = require('egg');

class CommentService extends Service {
  /**
   * 获取评论
   * @param {*} payload
   * @return
   */
  async getAllCommentByShopId(payload) {
    const results = await this.app.mysql.get('comment', { shop_id: payload.shopId });
    const user = await this.app.mysql.get('user', { id: results.user_id });
    results.user = user;
    const pic = await this.app.mysql.get('pic_comment', { comment_id: results.id });
    const img = [].concat(pic || undefined);
    results.img = img;
    const res = [].concat(results || undefined);
    return res;
  }
  /**
   * 评论
   * @param {*} payload
   * @return
   */
  async addComment(payload) {
    const user = await this.app.mysql.get('user', { username: payload.username });
    const res = await this.app.mysql.insert('comment', {
      user_id: user.id,
      shop_id: +payload.shopId,
      content: payload.content,
      start: +payload.start,
    });
    if (payload.files) {
      for (let i = 0; i < payload.files.length; i++) {
        await this.app.mysql.insert('pic_comment', {
          url: payload.files[i],
          comment_id: res.insertId,
        });
      }
    }

    let totalStar = await this.app.mysql.get('star_total', { shop_id: +payload.shopId });
    if (totalStar) {
      totalStar.star_total += payload.start;
      await this.app.mysql.update('star_total', totalStar);
    } else {
      totalStar = {
        shop_id: +payload.shopId,
        star_total: payload.start,
      };
      await this.app.mysql.insert('star_total', totalStar);
    }

    const shop = await this.app.mysql.get('shop', { id: +payload.shopId });
    shop.comment_quantity += 1;
    shop.star = totalStar.star_total / shop.comment_quantity;
    await this.app.mysql.update('shop', shop);

    return res;
  }

  /**
   * 取消评论
   * @param {*} payload
   * @return
   */
  async cancelComment(payload) {
    const res = await this.app.mysql.delete('comment', payload);
    return res;
  }

  /**
   * 更新评论
   * @param {*} payload
   * @return
   */
  async updateComment(payload) {
    const res = await this.app.mysql.update('comment', {
      id: payload.id,
      user_id: payload.userId,
      shop_id: payload.shopId,
      comment: payload.comment,
    });
    return res;
  }

  /**
   * 验证用户是否评论
   * @param {*} payload
   * @return
   */
  async CheckComment(payload) {
    const user = await this.app.mysql.get('user', { username: payload.username });
    const res = await this.app.mysql.get('comment', { user_id: user.id, shop_id: payload.id });
    return res ? 1 : 0;
  }
}

module.exports = CommentService;
