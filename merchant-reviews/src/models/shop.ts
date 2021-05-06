import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import {
  getShop,
  addDiscountItem,
  getDiscountList,
  addDiscountGoods,
} from '@/services/shop';
import { message } from 'antd';

type discount = {
  id: number;
  name: string;
  pic: string;
  goods: number;
  price: number;
};

export interface ShopModelState {
  isFetching: boolean;
  msg: string;
  shop: any;
  discount: Array<discount>;
}

const initialState = {
  isFetching: false,
  msg: '',
  shop: {},
  discount: [],
};

export interface ShopModelType {
  namespace: 'shop';
  state: ShopModelState;
  effects: {
    getShopItem: Effect;
    addDiscount: Effect;
    getAllDiscounts: Effect;
    goodsDiscount: Effect;
  };
  reducers: {
    getItem: Reducer<ShopModelState>;
    changeState: Reducer<ShopModelState>;
    getDiscounts: Reducer<ShopModelState>;
    addGodds: Reducer<ShopModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

const ShopModel: ShopModelType = {
  namespace: 'shop',

  state: {
    isFetching: false,
    msg: '',
    shop: {},
    discount: [],
  },

  effects: {
    // 获取餐馆信息
    *getShopItem({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(getShop, { id });
      yield put({
        type: 'getItem',
        payload: {
          shop: response.data,
        },
      });
    },
    // 获取所有推荐菜
    *getAllDiscounts({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(getDiscountList, { id });
      yield put({
        type: 'getDiscounts',
        payload: {
          discount: response.data || [],
        },
      });
    },
    // 添加推荐菜
    *addDiscount({ payload }, { call, put }) {
      const { id, name, price, files } = payload;
      const response = yield call(addDiscountItem, { id, name, price, files });
      yield put({
        type: 'changeState',
        payload: {
          msg: response.msg,
        },
      });
      if (response.msg === '添加失败') {
        message.error(response.msg);
      } else {
        history.goBack();
      }
    },
    *goodsDiscount({ payload }, { call, put }) {
      const { id, discount } = payload;
      const response = yield call(addDiscountGoods, { id });
      for (const item of discount) {
        if (item.id === id) {
          item.goods += 1;
        }
      }
      yield put({
        type: 'changeState',
        payload: {
          msg: response.msg,
          discount,
        },
      });
    },
  },
  reducers: {
    getItem(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        shop: payload.shop,
      };
    },
    getDiscounts(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        discount: payload.discount,
      };
    },
    changeState(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        msg: payload.msg,
      };
    },
    addGodds(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        msg: payload.msg,
        discount: payload.discount,
      };
    },
  },
};

export default ShopModel;
