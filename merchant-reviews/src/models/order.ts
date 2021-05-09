import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getAllProductById, addOrder } from '@/services/order';

export interface OrderModelState {
  isFetching: boolean;
  pageCount: number;
  data: any[];
}

const initialState = {
  isFetching: false,
  pageCount: 0,
  data: [],
};

export interface OrderModelType {
  namespace: 'order';
  state: OrderModelState;
  effects: {
    loadLikes: Effect;
    createOrder: Effect;
  };
  reducers: {
    setItem: Reducer<OrderModelState>;
    setState: Reducer<OrderModelState>;
  };
}

const OrderModel: OrderModelType = {
  namespace: 'order',

  state: {
    isFetching: false,
    pageCount: 0,
    data: [],
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
            order: response.data,
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
    // 生成订单
    *createOrder({ payload }, { call, put }) {
      payload.createTime = new Date().getTime();
      const response = yield call(addOrder, payload);
      yield put({
        type: 'setState',
        payload: {
          msg: response.msg,
        },
      });
    },
  },
  reducers: {
    setItem(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        data: payload.order,
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

export default OrderModel;
