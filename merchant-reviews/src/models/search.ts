import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { searchShopList } from '@/services/shop';

export interface SearchModelState {
  isFetching: boolean;
  pageCount: number;
  data: any[];
  msg: string;
}

const initialState = {
  isFetching: false,
  pageCount: 0,
  data: [],
  msg: '',
};

export interface SearchModelType {
  namespace: 'search';
  state: SearchModelState;
  effects: {
    searchShop: Effect;
    clearSearch: Effect;
  };
  reducers: {
    getShop: Reducer<SearchModelState>;
    setSate: Reducer<SearchModelState>;
    clearShop: Reducer<SearchModelState>;
  };
}

const SearchModel: SearchModelType = {
  namespace: 'search',

  state: {
    isFetching: false,
    pageCount: 0,
    data: [],
    msg: '',
  },

  effects: {
    // 加载数据
    *searchShop({ payload }, { call, put }) {
      const { rowIndex, keyWords } = payload;
      const response = yield call(searchShopList, { rowIndex, keyWords });
      yield put({
        type: 'getShop',
        payload: {
          shop: response.data,
        },
      });
    },
    *clearSearch({ payload }, { call, put }) {
      yield put({
        type: 'clearShop',
      });
    },
  },
  reducers: {
    getShop(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        data: state.data.concat(payload.shop),
      };
    },
    setSate(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        msg: payload.msg,
      };
    },
    clearShop(state = initialState) {
      return {
        ...state,
        isFetching: true,
        pageCount: 0,
        data: [],
      };
    },
  },
};

export default SearchModel;
