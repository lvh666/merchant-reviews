import comment from '@/models/comment';
import React, { useEffect } from 'react';
import { useSelector, useDispatch, CommentModelState } from 'umi';
import CommentDesc from '../CommentDesc';
import './style.css';

interface CommentProps {
  id: string;
  num: number;
  showComment: (url: string) => void;
}

const index: React.FC<CommentProps> = ({ id, num, showComment }) => {
  const dispatch = useDispatch();
  const comments = useSelector(
    ({ comment }: { comment: CommentModelState }) => comment.comments,
  );

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
    <div className="detail">
      <div className="detail__more">
        <span>网友评论</span>
        <span className="detail__notice">({num})</span>
        <i
          className="detail__arrow"
          onClick={() => showComment('commentList')}
        />
      </div>
      {comments.map((comment, index) => {
        if (index < 2) {
          return (
            <CommentDesc
              key={comment.id}
              data={comment}
              flag={!!index}
              showComment={showComment}
            />
          );
        }
      })}
    </div>
  );
};

export default index;
