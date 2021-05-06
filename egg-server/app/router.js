'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.get('/', controller.home.index);

  // 餐馆
  router.get('/getAllShop', controller.shop.getAllShop);
  router.get('/getShopById', controller.shop.getShopById);
  router.get('/searchShop', controller.shop.searchShop);
  router.post('/shop/addDiscount', jwt, controller.shop.addDiscount);
  router.get('/getAllDiscount', controller.shop.getAllDiscount);
  router.post('/shop/goodsDiscount', jwt, controller.shop.addDiscountGoods);

  // 产品
  router.get('/getProductById', controller.product.getProductById);
  router.get('/getAllProductById', controller.product.getAllProductByShopId);

  // 订单
  router.post('/getOrderById', jwt, controller.order.getOrderById);
  router.post('/getAllOrderByUserId', jwt, controller.order.getAllOrderByUserId);
  router.post('/order/Item', jwt, controller.order.addOrder);
  router.delete('/order/Item', jwt, controller.order.cancelOrder);

  // 评论
  router.get('/getAllCommentByShopId', controller.comment.getAllCommentByShopId);
  router.post('/comment/checkComment', jwt, controller.comment.CheckComment);
  router.post('/comment/Item', jwt, controller.comment.addComment);
  router.post('/uploadPic', controller.comment.upload);
  router.delete('/comment/Item', jwt, controller.comment.cancelComment);
  router.put('/comment/Item', jwt, controller.comment.updateComment);

  // 登录，注册
  router.post('/registered', controller.user.registered);
  router.post('/checkPhone', controller.user.checkPhone);
  router.post('/login', controller.userAccess.login);
  router.post('/user/changePassword', jwt, controller.user.changePassword);
  router.post('/user/getItem', jwt, controller.user.getItem);
  router.post('/user/changeItem', jwt, controller.user.changeUser);
};
