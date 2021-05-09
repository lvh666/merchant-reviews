import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getAllOrderByUserId, addOrder, cancelOrder } from '@/services/order';

export interface OrderModelState {
  isFetching: boolean;
  data: any[];
}

const initialState = {
  isFetching: false,
  data: [],
};

export interface OrderModelType {
  namespace: 'order';
  state: OrderModelState;
  effects: {
    getOrder: Effect;
    createOrder: Effect;
    delOrder: Effect;
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
    data: [],
  },

  effects: {
    // 加载产品数据
    *getOrder({ payload }, { call, put }) {
      const { username } = payload;
      const response = yield call(getAllOrderByUserId, { username });
      if (response.data) {
        yield put({
          type: 'setItem',
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
    *delOrder({ payload }, { call, put }) {
      const { id, data } = payload;
      const response = yield call(cancelOrder, { id });
      yield put({
        type: 'setState',
        payload: {
          msg: response.msg,
        },
      });
      if (response.msg === '取消成功') {
        for (const item of data) {
          if (item.id === id) {
            item.state = 2;
            break;
          }
        }
        yield put({
          type: 'setItem',
          payload: {
            order: data,
          },
        });
      }
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
