'use strict';

const { Service } = require('egg');

class UserService extends Service {
  /**
   * 注册
   * @param {*} payload
   * @return
   */
  async registered(payload) {
    // 加密
    payload.password = await this.ctx.genHash(payload.password);
    payload.create_time = new Date();
    const res = await this.app.mysql.insert('user', payload);
    return res;
  }

  /**
   * 验证手机号是否注册
   * @param {*} payload
   * @return
   */
  async checkPhone(payload) {
    const res = await this.app.mysql.get('user', { username: payload.username });
    return res ? 1 : 0;
  }

  /**
   * 获取用户信息
   * @param {*} payload
   * @return
   */
  async getItem(payload) {
    const res = await this.app.mysql.get('user', { username: payload.username });
    return res;
  }

  /**
   * 修改密码
   * @param {*} payload
   * @return
   */
  async changePassword(payload) {
    // 加密
    payload.password = await this.ctx.genHash(payload.password);
    const user = await this.app.mysql.get('user', { username: payload.username });
    user.password = payload.password;
    const res = await this.app.mysql.update('user', user);

    return res;
  }

  /**
   * 修改用户
   * @param {*} payload
   * @return
   */
  async changeUser(payload) {
    const user = await this.app.mysql.get('user', { id: payload.id });
    user.username = payload.username;
    user.name = payload.name;
    const res = await this.app.mysql.update('user', user);

    return res;
  }
}

module.exports = UserService;
