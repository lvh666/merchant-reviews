'use strict';
const { Service } = require('egg');

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;
    // 用户名
    const user = await this.app.mysql.get('user', { username: payload.username });
    if (!user) {
      ctx.throw(404, '手机号未注册');
    }
    const pwdMatchFlag = await this.ctx.compare(payload.password, user.password);
    if (!pwdMatchFlag) {
      ctx.throw(404, '密码错误');
    }
    user.password = 'haha';
    return {
      user,
      token: await service.actionToken.apply(user.id),
    };
  }

  async current() {
    const { ctx } = this;
    const _id = ctx.state.user.data._id;
    const user = await this.app.mysql.get('user', { username: _id });
    user.password = 'haha';
    return user;
  }
}

module.exports = UserAccessService;
