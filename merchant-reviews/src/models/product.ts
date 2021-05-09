import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getAllProductById, getProductById } from '@/services/product';

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
