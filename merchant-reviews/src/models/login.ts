import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import { login } from '@/services/user';

export interface LoginModelState {
  username: string;
  isFetching: boolean;
  status: boolean;
}

const initialState = {
  username: localStorage.getItem('username') || '',
  isFetching: false,
  status: !!localStorage.getItem('login') || false, //登录态标识
};

export interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    userLogin: Reducer<LoginModelState>;
    userLogout: Reducer<LoginModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  // subscriptions: { setup: Subscription };
}

const LoginModel: LoginModelType = {
  namespace: 'login',

  state: {
    username: localStorage.getItem('username') || '',
    isFetching: false,
    status: !!localStorage.getItem('login') || false, //登录态标识
  },

  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      const { username, password } = payload;
      const response = yield call(login, { username, password });
      yield put({
        type: 'userLogin',
        payload: {
          user: response.data.user,
        }, // 把后台返回的data赋值给了num
      });
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('login', 'true');
      history.push('/');
    },
    // 登出
    *logout({ payload }, { call, put }) {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('login');
      yield put({ type: 'userLogout' });
      history.push('/');
    },
  },
  reducers: {
    userLogin(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        status: true,
        username: payload.user.name,
      };
    },
    userLogout(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        status: false,
        username: '',
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  /* subscriptions: {
    setup({ dispatch, history }) {
      console.log('login subscriptions');
    },
  }, */
};

export default LoginModel;
