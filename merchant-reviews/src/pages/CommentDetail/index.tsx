import React, { useEffect } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  ShopModelState,
  CommentModelState,
  ProductModelState,
} from 'umi';
import Header from '@/components/Header';
import CommentDesc from './components/CommentDesc';

const index = () => {
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const comment = useSelector(
    ({ comment }: { comment: CommentModelState }) => comment.comment,
  );

  useEffect(() => {
    dispatch({
      type: 'comment/getCommentById',
      payload: {
        id,
      },
    });
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Header title="评论详情" onBack={handleBack} grey />
      <CommentDesc key={comment.id} data={comment} />
    </div>
  );
};

export default index;
