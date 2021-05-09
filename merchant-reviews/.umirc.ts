import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/Login' },
    { path: '/registered', component: '@/pages/Registered' },
    { path: '/productDetail/:id', component: '@/pages/ProductDetail' },
    { path: '/shop/:id', component: '@/pages/Shop' },
    { path: '/search', component: '@/pages/Search' },
    { path: '/searchResult/:keyWords', component: '@/pages/SearchResult' },
    { path: '/user', component: '@/pages/User' },
    { path: '/updateSetting', component: '@/pages/Setting' },
    { path: '/purchase/:id', component: '@/pages/Purchase' },
    { path: '/order', component: '@/pages/Order' },
    { path: '/productList/:id', component: '@/pages/DisCountProducts' },
    { path: '/comment/:id', component: '@/pages/Comment' },
    { path: '/commentList/:id', component: '@/pages/CommentList' },
    { path: '/discount/:id', component: '@/pages/Discount' },
    { path: '/discount/add/:id', component: '@/pages/AddDiscount' },
  ],
  dva: {},
  fastRefresh: {},
});
