'use strict';

module.exports = {
  changeShopRequest: {
    id: {
      type: 'number',
      description: 'id',
      required: true,
      example: 10,
    },
    shop: {
      type: 'string',
      description: '餐馆名',
      required: true,
      example: '',
    },
    category: {
      type: 'string',
      description: '类型',
      required: true,
      example: '',
    },
    address: {
      type: 'string',
      description: '地址',
      required: true,
      example: '',
    },
    region: {
      type: 'string',
      description: '区域',
      required: true,
      example: '',
    },
    price: {
      type: 'number',
      description: '价格',
      required: true,
      example: 10,
    },
    files: {
      type: 'string',
      description: '图片',
      required: false,
    },
  },
  getShopRequest: {
    username: {
      type: 'string',
      description: '用户ID',
      required: true,
      example: '',
    },
  },
  delShopRequest: {
    id: {
      type: 'number',
      description: 'ID',
      required: true,
      example: 10,
    },
  },
  getAllShopRequest: {
    curPage: {
      type: 'number',
      description: '当前页数',
      required: true,
      example: 0,
    },
    pageNum: {
      type: 'number',
      description: '个/页',
      required: true,
      example: 10,
    },
  },
  addDiscountRequest: {
    id: {
      type: 'number',
      description: '餐馆ID',
      required: true,
      example: 10,
    },
    name: {
      type: 'string',
      description: '菜品名称',
      required: true,
      example: 10,
    },
    price: {
      type: 'number',
      description: '价格',
      required: true,
      example: 10,
    },
    files: {
      type: 'Array',
      description: '图片',
      required: false,
    },
  },
  addShopRequest: {
    username: {
      type: 'string',
      description: '用户名',
      required: true,
      example: '',
    },
    shop: {
      type: 'string',
      description: '餐馆名',
      required: true,
      example: '',
    },
    category: {
      type: 'string',
      description: '类型',
      required: true,
      example: '',
    },
    address: {
      type: 'string',
      description: '地址',
      required: true,
      example: '',
    },
    region: {
      type: 'string',
      description: '区域',
      required: true,
      example: '',
    },
    price: {
      type: 'number',
      description: '价格',
      required: true,
      example: 10,
    },
    files: {
      type: 'string',
      description: '图片',
      required: false,
    },
  },
  goodsDiscountRequest: {
    id: {
      type: 'number',
      description: 'ID',
      required: true,
      example: 10,
    },
  },
};
