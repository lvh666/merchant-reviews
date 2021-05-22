import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import {
  getShop,
  addDiscountItem,
  getDiscountList,
  addDiscountGoods,
  addShop,
  getShopListByUserId,
  delShopItem,
  changeShopItem,
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
  shops: any;
  discount: Array<discount>;
}

const initialState = {
  isFetching: false,
  msg: '',
  shop: {},
  shops: [],
  discount: [],
};

export interface ShopModelType {
  namespace: 'shop';
  state: ShopModelState;
  effects: {
    getShopItem: Effect;
    addDiscount: Effect;
    addShop: Effect;
    getAllDiscounts: Effect;
    goodsDiscount: Effect;
    getShopItemByUserID: Effect;
    changeShop: Effect;
    delShop: Effect;
  };
  reducers: {
    getItem: Reducer<ShopModelState>;
    changeState: Reducer<ShopModelState>;
    getDiscounts: Reducer<ShopModelState>;
    addGodds: Reducer<ShopModelState>;
    setShops: Reducer<ShopModelState>;
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
    shops: [],
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
    // 通过用户ID获取餐馆信息
    *getShopItemByUserID({ payload }, { call, put }) {
      const { username } = payload;
      const response = yield call(getShopListByUserId, { username });
      yield put({
        type: 'setShops',
        payload: {
          shops: response.data,
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
      if (response.msg === '添加成功') {
        history.goBack();
      } else {
        message.error(response.msg);
      }
    },
    // 修改餐馆信息
    *changeShop({ payload }, { call, put }) {
      const response = yield call(changeShopItem, payload);
      yield put({
        type: 'changeState',
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
    *delShop({ payload }, { call, put }) {
      const { id, shops } = payload;
      const response = yield call(delShopItem, { id });
      if (response.msg === '删除成功') {
        let data = shops.filter((shop: any) => shop.id !== id);
        yield put({
          type: 'setShops',
          payload: {
            shops: data,
          },
        });
        message.success(response.msg);
      } else {
        message.error(response.msg);
      }
    },
    *addShop({ payload }, { call, put }) {
      const response = yield call(addShop, payload);
      yield put({
        type: 'changeState',
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
    setShops(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        shops: payload.shops,
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
