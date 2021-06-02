'use strict';

module.exports = {
  getAllOrderRequest: {
    username: {
      type: 'string',
      description: '用户ID',
      required: true,
      example: 0,
    },
  },
  withdrawRequest: {
    username: {
      type: 'string',
      description: '用户名',
      required: true,
      example: 0,
    },
    name: {
      type: 'string',
      description: '账户名',
      required: true,
      example: 0,
    },
    paypalName: {
      type: 'string',
      description: 'PayPal账号',
      required: true,
      example: 0,
    },
  },
  orderRequest: {
    id: {
      type: 'number',
      description: '订单ID',
      required: true,
      example: 0,
    },
    status: {
      type: 'number',
      description: '状态码',
      required: false,
      example: 0,
    },
    flag: {
      type: 'boolean',
      description: '标签',
      required: false,
      example: false,
    },
  },
  addOrderRequest: {
    username: {
      type: 'string',
      description: '用户名',
      required: true,
      example: 0,
    },
    shopId: {
      type: 'number',
      description: '餐馆ID',
      required: true,
      example: 0,
    },
    productId: {
      type: 'number',
      description: '商品ID',
      required: true,
      example: 0,
    },
    price: {
      type: 'number',
      description: '单价',
      required: true,
      example: 0,
    },
    num: {
      type: 'number',
      description: '数量',
      required: true,
      example: 0,
    },
    createTime: {
      type: 'number',
      description: '创建时间',
      required: true,
      example: 0,
    },
    pic: {
      type: 'string',
      description: '图片',
      required: true,
      example: 0,
    },
  },
};
