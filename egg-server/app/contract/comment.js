'use strict';

module.exports = {
  checkCommentRequest: {
    username: {
      type: 'string',
      description: '用户名',
      required: true,
      example: '',
    },
  },
  addCommentRequest: {
    username: {
      type: 'string',
      description: '用户名',
      required: true,
      example: '',
    },
    shopId: {
      type: 'string',
      description: '餐馆ID',
      required: true,
      example: '0',
    },
    start: {
      type: 'string',
      description: '评分',
      required: true,
      example: '1',
    },
    content: {
      type: 'string',
      description: '评论',
      required: true,
      example: '',
    },
    files: {
      type: 'Array',
      description: '图片',
      required: false,
      example: [],
    },
  },
  updateCommentRequest: {
    id: {
      type: 'number',
      description: '评论ID',
      required: true,
      example: 0,
    },
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
    comment: {
      type: 'string',
      description: '评论',
      required: true,
      example: '',
    },
  },
};
