import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
import {
  changeComment,
  addComment,
  getComment,
  uploadPicItem,
  checkComment,
  countCommentGoods,
  getUserComment,
  delComment,
  getComments,
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
  comment: CommentParems;
  comments: Array<CommentParems>;
  pic?: any;
}

const initialState = {
  isFetching: false,
  msg: '',
  comments: [],
  comment: {
    id: 0,
    comment: '',
    pic: [],
  },
};

export interface CommentModelType {
  namespace: 'comment';
  state: CommentModelState;
  effects: {
    updateComment: Effect;
    getComment: Effect;
    getCommentById: Effect;
    getSelfComment: Effect;
    addComment: Effect;
    uploadPic: Effect;
    isComment: Effect;
    addCommentGoods: Effect;
    cancelComments: Effect;
  };
  reducers: {
    getItem: Reducer<CommentModelState>;
    changeState: Reducer<CommentModelState>;
    addPic: Reducer<CommentModelState>;
    changeComment: Reducer<CommentModelState>;
    setComment: Reducer<CommentModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}

const CommentModel: CommentModelType = {
  namespace: 'comment',

  state: {
    isFetching: false,
    msg: '',
    comments: [],
    comment: {
      id: 0,
      comment: '',
      pic: [],
    },
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
      const { shopId } = payload;
      const response = yield call(getComments, { shopId });
      yield put({
        type: 'getItem',
        payload: {
          comments: response.data,
        },
      });
    },
    *getCommentById({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(getComment, { id });
      yield put({
        type: 'setComment',
        payload: {
          comment: response.data,
        },
      });
    },
    *getSelfComment({ payload }, { call, put }) {
      const { username } = payload;
      const response = yield call(getUserComment, { username });
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
        id,
      });
      yield put({
        type: 'changeState',
        payload: {
          msg: response.msg,
        },
      });
    },
    *addCommentGoods({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(countCommentGoods, { id });
      yield put({
        type: 'changeState',
        payload: {
          msg: response.msg,
        },
      });
    },
    *cancelComments({ payload }, { call, put }) {
      const { id, comments } = payload;

      const response = yield call(delComment, { id });
      if (response.msg === '取消成功') {
        const ans = comments.filter((comment: CommentParems) => comment.id != id);
        yield put({
          type: 'getItem',
          payload: {
            comments: ans,
          },
        });
      } else {
        message.error(response.msg);
      }
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
    changeComment(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        msg: payload.msg,
      };
    },
    setComment(state = initialState, { payload }) {
      return {
        ...state,
        isFetching: true,
        comment: payload.comment,
      };
    },
  },
};

export default CommentModel;
