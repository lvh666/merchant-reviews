'use strict';

module.exports = options => {
  return async function jwt(ctx, next) {
    let token = ctx.request.header.authorization;
    token = token.substring(7);
    if (token) {
      try {
        // 解码token
        ctx.state.user = ctx.app.jwt.verify(token, options.secret);
        await next();
      } catch (error) {
        ctx.throw(401, error.message);
      }
    } else {
      ctx.throw(401, 'token失效或解析错误');
    }
  };
};
