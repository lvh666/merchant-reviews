import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import {
  changeComment,
  addComment,
  getComment,
  uploadPicItem,
  checkComment,
} from '@/services/comment';
import { message } from 'antd';

interface CommentParems {
  id: number;
  comment: string;
  pic: any;
}

export interface CommentModelState {
  isFetching: boolean;
  msg: string;
  comments?: Array<CommentParems>;
  pic?: any;
}

const initialState = {
  isFetching: false,
  msg: '',
};

export interface CommentModelType {
  namespace: 'comment';
  state: CommentModelState;
  effects: {
    updateComment: Effect;
    getComment: Effect;
    addComment: Effect;
    uploadPic: Effect;
    isComment: Effect;
  };
  reducers: {
    getItem: Reducer<CommentModelState>;
    changeState: Reducer<CommentModelState>;
    addPic: Reducer<CommentModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

const CommentModel: CommentModelType = {
  namespace: 'comment',

  state: {
    isFetching: false,
    msg: '',
  },

  effects: {
    // 修改评论
    *updateComment({ payload }, { call, put }) {
      const { id, start, content, files } = payload;
      const response = yield call(changeComment, { id, start, content, files });
      yield put({
        type: 'changeState',
        payload: {
          msg: response.msg,
        },
      });
    },
    // 获取评论信息
    *getComment({ payload }, { call, put }) {
      const { shopId, rowIndex } = payload;
      const response = yield call(getComment, { shopId, rowIndex });
      yield put({
        type: 'getItem',
        payload: {
          comments: response.data,
        },
      });
    },
    // 发布评论
    *addComment({ payload }, { call, put }) {
      const { username, shopId, start, content, files } = payload;
      const response = yield call(addComment, {
        username,
        shopId,
        start,
        content,
        files,
      });
      if (response.msg === '添加失败') {
        message.error(response.msg);
      } else {
        history.goBack();
      }
    },
    *uploadPic({ payload }, { call, put }) {
      const { file } = payload;
      const response = yield call(uploadPicItem, {
        file,
      });
      yield put({
        type: 'addPic',
        payload: {
          pic: response.data,
        },
      });
    },
    *isComment({ payload }, { call, put }) {
      const { username, id } = payload;
      const response = yield call(checkComment, {
        username,
        id
      });
      yield put({
        type: 'changeState',
        payload: {
          msg: response.msg,
        },
      });
    },
  },
  reducers: {
    getItem(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        comments: payload.comments,
      };
    },
    changeState(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        msg: payload.msg,
      };
    },
    addPic(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: false,
        pic: payload.pic,
      };
    },
  },
};

export default CommentModel;
