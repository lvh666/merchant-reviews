import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import { changePassword, changeUser, getUser } from '@/services/user';
import { message } from 'antd';

interface UserParems {
  id: number;
  username: string;
  password: string;
  name: string;
  money: number;
  avar: string;
}

export interface UserModelState {
  isFetching: boolean;
  msg: string;
  user?: UserParems;
}

const initialState = {
  isFetching: false,
  msg: '',
};

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    updatePassword: Effect;
    getUser: Effect;
    changeUser: Effect;
  };
  reducers: {
    getItem: Reducer<UserModelState>;
    changeState: Reducer<UserModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    isFetching: false,
    msg: '',
  },

  effects: {
    // 修改密码
    *updatePassword({ payload }, { call, put }) {
      const { username, password } = payload;
      const response = yield call(changePassword, { username, password });
      yield put({
        type: 'changeState',
        payload: {
          msg: response.msg,
        },
      });
    },
    // 获取用户信息
    *getUser({ payload }, { call, put }) {
      const { username } = payload;
      const response = yield call(getUser, { username });
      yield put({
        type: 'getItem',
        payload: {
          user: response.data,
        },
      });
    },
    // 修改用户信息
    *changeUser({ payload }, { call, put }) {
      const { id, username, name } = payload;
      const response = yield call(changeUser, { id, username, name });
      if (response.msg === '修改失败') {
        message.error(response.msg);
      } else {
        localStorage.setItem('username', username);
        localStorage.setItem('name', name);
        history.push('/user');
      }
    },
  },
  reducers: {
    getItem(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        user: payload.user,
      };
    },
    changeState(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        msg: payload.msg,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/updateSetting') {
          dispatch({
            type: 'user/getUser',
            payload: {
              username: localStorage.getItem('username'),
            },
          });
        }
      });
    },
  },
};

export default UserModel;
