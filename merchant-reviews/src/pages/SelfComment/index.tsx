import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { history, useSelector, useDispatch, CommentModelState } from 'umi';
import CommentDesc from './components/CommentDesc';

const index = () => {
  const { comments } = useSelector(
    ({ comment }: { comment: CommentModelState }) => comment,
  );
  const dispatch = useDispatch();

  const delComments = (id: number) => {
    dispatch({
      type: 'comment/cancelComments',
      payload: {
        id,
        comments,
      },
    });
  };

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch({
      type: 'comment/getSelfComment',
      payload: {
        username: localStorage.getItem('username'),
      },
    });
  }, []);

  return (
    <div>
      <Header title="评论列表" onBack={handleBack} grey />
      {comments.map((comment) => {
        return (
          <CommentDesc
            key={comment.id}
            data={comment}
            delComments={delComments}
          />
        );
      })}
    </div>
  );
};

export default index;
