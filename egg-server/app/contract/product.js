'use strict';

module.exports = {
  changeProductRequest: {
    id: {
      type: 'number',
      description: 'id',
      required: true,
      example: 10,
    },
    shopId: {
      type: 'number',
      description: '餐馆ID',
      required: true,
      example: 1,
    },
    product: {
      type: 'string',
      description: '商品名',
      required: true,
      example: '',
    },
    currentPrice: {
      type: 'number',
      description: '当前价格',
      required: true,
      example: 1,
    },
    oldPrice: {
      type: 'number',
      description: '老价格',
      required: true,
      example: 1,
    },
    saleDesc: {
      type: 'string',
      description: '商品描述',
      required: true,
      example: '',
    },
    tag: {
      type: 'string',
      description: '是否预约',
      required: true,
      example: '免预约',
    },
    files: {
      type: 'string',
      description: '图片',
      required: false,
    },
    startTime: {
      type: 'number',
      description: '开始时间',
      required: true,
      example: 1,
    },
    endTime: {
      type: 'number',
      description: '结束时间',
      required: true,
      example: 1,
    },
  },
  getProductRequest: {
    username: {
      type: 'string',
      description: '用户名',
      required: true,
      example: '',
    },
  },
  delProductRequest: {
    id: {
      type: 'number',
      description: 'ID',
      required: true,
      example: 10,
    },
  },
  addProductRequest: {
    shopId: {
      type: 'number',
      description: '餐馆ID',
      required: true,
      example: 1,
    },
    product: {
      type: 'string',
      description: '商品名',
      required: true,
      example: '',
    },
    currentPrice: {
      type: 'number',
      description: '当前价格',
      required: true,
      example: 1,
    },
    oldPrice: {
      type: 'number',
      description: '老价格',
      required: true,
      example: 1,
    },
    saleDesc: {
      type: 'string',
      description: '商品描述',
      required: true,
      example: '',
    },
    tag: {
      type: 'string',
      description: '是否预约',
      required: true,
      example: '免预约',
    },
    files: {
      type: 'string',
      description: '图片',
      required: false,
    },
    startTime: {
      type: 'number',
      description: '开始时间',
      required: true,
      example: 1,
    },
    endTime: {
      type: 'number',
      description: '结束时间',
      required: true,
      example: 1,
    },
  },
};
