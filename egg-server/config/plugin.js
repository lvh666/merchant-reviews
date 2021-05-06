'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 接口文档
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc-feat',
  },
  // 有效性
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 数据库
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 密码hasn加密
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
  // 用户鉴权
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  // 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
