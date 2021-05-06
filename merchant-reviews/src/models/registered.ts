import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import { registered, checkPhone } from '@/services/user';

export interface RegisteredModelState {
  error: string;
  isFetching: boolean;
}

const initialState = {
  error: '',
  isFetching: false,
};

export interface RegisteredModelType {
  namespace: 'registered';
  state: RegisteredModelState;
  effects: {
    registered: Effect;
    checkPhone: Effect;
  };
  reducers: {
    userRegistered: Reducer<RegisteredModelState>;
    userRegisteredFail: Reducer<RegisteredModelState>;
    isAppend: Reducer<RegisteredModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
//   subscriptions: { setup: Subscription };
}

const RegisteredModel: RegisteredModelType = {
  namespace: 'registered',

  state: {
    error: '',
    isFetching: false,
  },

  effects: {
    // 注册
    *registered({ payload }, { call, put }) {
      const { username, password, relName } = payload;
      const response = yield call(registered, { username, password, name: relName });
      if (response.msg === '注册成功') {
        yield put({
          type: 'userRegistered',
        });
        history.push('/login');
      } else {
        yield put({
          type: 'userRegisteredFail',
          payload: {
            error: response.msg,
          },
        });
      }
    },
    // 手机号验证
    *checkPhone({ payload }, { call, put }) {
      const { username } = payload;
      const response = yield call(checkPhone, { username });
      yield put({
        type: 'isAppend',
        payload: {
          error: response.msg,
        },
      });
    },
  },
  reducers: {
    userRegistered(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        error: '',
      };
    },
    userRegisteredFail(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload.error,
      };
    },
    isAppend(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload.error,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  /* subscriptions: {
    setup({ dispatch, history }) {
      console.log('registered subscriptions');
    },
  }, */
};

export default RegisteredModel;
