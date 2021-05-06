'use strict';

module.exports = {
  registeredRequest: {
    username: {
      type: 'string',
      description: '手机号',
      required: true,
      example: '',
      format: /^1[34578]\d{9}$/,
    },
    password: {
      type: 'string',
      description: '密码',
      required: true,
      example: '',
    },
    name: {
      type: 'string',
      description: '用户名',
      required: true,
      example: '',
    },
  },
  checkPhoneRequest: {
    username: {
      type: 'string',
      description: '手机号',
      required: true,
      example: '13035651111',
      format: /^1[34578]\d{9}$/,
    },
  },
  loginRequest: {
    username: {
      type: 'string',
      description: '手机号',
      required: true,
      example: '13035651111',
      format: /^1[34578]\d{9}$/,
    },
    password: {
      type: 'string',
      description: '密码',
      required: true,
      example: '123456',
    },
  },
  changeRequest: {
    username: {
      type: 'string',
      description: '手机号',
      required: true,
      example: '13035651111',
      format: /^1[34578]\d{9}$/,
    },
    name: {
      type: 'string',
      description: '用户名',
      required: true,
      example: '',
    },
  },
};
