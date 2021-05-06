import React from 'react';
import CommentDesc from '../CommentDesc';
import './style.css';

interface CommentProps {
  num: number;
  showComment: (url: string) => void;
}

const index: React.FC<CommentProps> = ({ num, showComment }) => {
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
      <CommentDesc flag={false} showComment={showComment} />
      <CommentDesc flag showComment={showComment} />
    </div>
  );
};

export default index;
