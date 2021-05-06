/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1616489048158_4291';

  // add your middleware config here
  config.middleware = [ 'errorHandler' ];

  // 接口文档
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: '接口',
      description: '接口 swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: false,
    routerMap: true,
    enable: true,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    // 允许访问接口的白名单，例如：http://localhost:8080 *表示均可访问
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 数据库
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '1234',
      // 数据库名
      database: 'merchant',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  exports.multipart = {
    mode: 'file',
  };

  exports.bcrypt = {
    saltRounds: 10, // default 10
  };

  // 鉴权
  exports.jwt = {
    secret: 'Great4-M',
    enable: true,
    match: /^\/api/,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
