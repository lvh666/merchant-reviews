import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import {
  getAllProductById,
  getProductById,
  getProduct,
  changeProductItem,
  delProductItem,
  addProduct,
} from '@/services/product';
import { message } from 'antd';

export interface ProductModelState {
  isFetching: boolean;
  pageCount: number;
  data: any[];
  product: any;
}

const initialState = {
  isFetching: false,
  pageCount: 0,
  data: [],
  product: {},
};

export interface ProductModelType {
  namespace: 'product';
  state: ProductModelState;
  effects: {
    loadLikes: Effect;
    loadDiscounts: Effect;
    getProductItemByUserID: Effect;
    changeProduct: Effect;
    delProduct: Effect;
    addProduct: Effect;
  };
  reducers: {
    likes: Reducer<ProductModelState>;
    discounts: Reducer<ProductModelState>;
    setState: Reducer<ProductModelState>;
  };
}

const ProductModel: ProductModelType = {
  namespace: 'product',

  state: {
    isFetching: false,
    pageCount: 0,
    data: [],
    product: {},
  },

  effects: {
    // 加载产品数据
    *loadLikes({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(getAllProductById, { id });
      if (response.data.length) {
        yield put({
          type: 'likes',
          payload: {
            products: response.data,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            msg: '无数据',
          },
        });
      }
    },
    // 加载特惠商品详细
    *loadDiscounts({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(getProductById, { id });
      if (response.data) {
        yield put({
          type: 'discounts',
          payload: {
            product: response.data,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            msg: '无数据',
          },
        });
      }
    },
    // 通过用户ID获取餐馆信息
    *getProductItemByUserID({ payload }, { call, put }) {
      const { username } = payload;
      const response = yield call(getProduct, { username });
      yield put({
        type: 'likes',
        payload: {
          products: response.data,
        },
      });
    },
    // 修改餐馆信息
    *changeProduct({ payload }, { call, put }) {
      const response = yield call(changeProductItem, payload);
      yield put({
        type: 'setState',
        payload: {
          msg: response.msg,
        },
      });
      if (response.msg === '修改成功') {
        message.success(response.msg);
        history.goBack();
      } else {
        message.error(response.msg);
      }
    },
    // 删除餐馆
    *delProduct({ payload }, { call, put }) {
      const { id, products } = payload;
      const response = yield call(delProductItem, { id });
      if (response.msg === '删除成功') {
        let data = products.filter((product: any) => product.id !== id);
        yield put({
          type: 'likes',
          payload: {
            products: data,
          },
        });
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    },
    *addProduct({ payload }, { call, put }) {
      const response = yield call(addProduct, payload);
      yield put({
        type: 'setState',
        payload: {
          msg: response.msg,
        },
      });
      if (response.msg === '添加成功') {
        history.goBack();
      } else {
        message.error(response.msg);
      }
    },
  },
  reducers: {
    likes(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        data: payload.products,
      };
    },
    discounts(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        product: payload.product,
      };
    },
    setState(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        msg: payload.msg,
      };
    },
  },
};

export default ProductModel;
