'use strict';

module.exports = {
  loginRequest: {
    username: {
      type: 'string',
      description: '手机号',
      required: true,
      example: '13035651111',
      // format: /^1[34578]\d{9}$/,
    },
    password: {
      type: 'string',
      description: '密码',
      required: true,
      example: '123456',
    },
  },
};
