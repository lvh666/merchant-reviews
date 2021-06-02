import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getShopList } from '@/services/shop';

export interface HomeModelState {
  isFetching: boolean;
  pageCount: number;
  data: any[];
}

const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    data: [],
  },
  discounts: {
    isFetching: false,
    pageCount: 0,
    data: [],
  },
};

export interface HomeModelType {
  namespace: 'home';
  state: HomeModelState;
  effects: {
    loadLikes: Effect;
    loadDiscounts: Effect;
  };
  reducers: {
    likes: Reducer<HomeModelState>;
    discounts: Reducer<HomeModelState>;
    setState: Reducer<HomeModelState>;
  };
}

const HomeModel: HomeModelType = {
  namespace: 'home',

  state: {
    isFetching: false,
    pageCount: 0,
    data: [],
  },

  effects: {
    // 加载数据
    *loadLikes({ payload }, { call, put }) {
      const rowIndex = payload.pageCount;
      const response = yield call(getShopList, { rowIndex });
      if (response.data.length) {
        yield put({
          type: 'likes',
          payload: {
            likesInfo: response.data,
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
    // 加载特惠商品
    *loadDiscounts({ payload }, { call, put }) {
      yield put({ type: 'discounts' });
    },
  },
  reducers: {
    likes(state = initialState.likes, { payload }) {
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        data: payload.likesInfo,
      };
    },
    discounts(state = initialState.discounts, { payload }) {
      return {
        ...state,
        isFetching: false,
        data: payload.likesInfo,
      };
    },
    setState(state = initialState.likes, { payload }) {
      return {
        ...state,
        isFetching: true,
        msg: payload.msg,
      };
    },
  },
};

export default HomeModel;
