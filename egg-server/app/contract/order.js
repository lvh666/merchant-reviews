'use strict';

module.exports = {
  getAllOrderRequest: {
    userId: {
      type: 'number',
      description: '用户ID',
      required: true,
      example: 0,
    },
  },
  orderRequest: {
    orderId: {
      type: 'number',
      description: '订单ID',
      required: true,
      example: 0,
    },
  },
  addOrderRequest: {
    userId: {
      type: 'number',
      description: '用户ID',
      required: true,
      example: 0,
    },
    shopId: {
      type: 'number',
      description: '餐馆ID',
      required: true,
      example: 0,
    },
    peoductId: {
      type: 'number',
      description: '商品ID',
      required: true,
      example: 0,
    },
    price: {
      type: 'number',
      description: '总价',
      required: true,
      example: 0,
    },
  },
};
