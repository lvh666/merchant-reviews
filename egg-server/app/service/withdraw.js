'use strict';

const { Service } = require('egg');

class WithdrawService extends Service {
  /**
   * 获取审核列表
   * @param {*} payload
   * @return
   */
  async getWithdrawList(payload) {
    const res = await this.app.mysql.select('withdraw', {
      limit: payload.pageNum * payload.curPage,
      offset: payload.pageNum,
    });
    for (const item of res) {
      const user = await this.app.mysql.get('user', { id: item.user_id });
      item.user = user;
    }
    return res;
  }

  /**
   * 审核
   * @param {*} payload
   * @return
   */
  async isWithdraw(payload) {
    const withdraw = await this.app.mysql.get('withdraw', { id: payload.id });
    withdraw.status = payload.status;
    const res = await this.app.mysql.update('withdraw', withdraw);
    if (payload.status === 1) {
      const user = await this.app.mysql.get('user', { id: payload.userId });
      user.money = 0;
      await this.app.mysql.update('user', user);
    }
    return res;
  }
}

module.exports = WithdrawService;
