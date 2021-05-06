'use strict';

module.exports = {
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
  goodsDiscountRequest: {
    id: {
      type: 'number',
      description: 'ID',
      required: true,
      example: 10,
    },
  },
};
