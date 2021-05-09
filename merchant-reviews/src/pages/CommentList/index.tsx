import React, { useEffect } from 'react';
import Header from '@/components/header';
import {
  history,
  useSelector,
  useDispatch,
  CommentModelState,
  useParams,
} from 'umi';
import CommentDesc from './components/CommentDesc';

const index = () => {
  const comments = useSelector(
    ({ comment }: { comment: CommentModelState }) => comment.comments,
  );
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  const handleBack = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch({
      type: 'comment/getComment',
      payload: {
        shopId: id,
        rowIndex: 0,
      },
    });
  }, []);


  return (
    <div>
      <Header title="评论列表" onBack={handleBack} grey />
      {comments.map((comment) => {
        return (
          <CommentDesc key={comment.id} data={comment} />
        );
      })}
    </div>
  );
};

export default index;
