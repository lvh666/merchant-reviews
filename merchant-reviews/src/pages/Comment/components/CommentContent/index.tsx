import React, { ChangeEvent } from 'react';
import { List, TextareaItem } from 'antd-mobile';

interface CommentContentProps {
  content: string;
  onChange: (e: any) => void;
}

const index: React.FC<CommentContentProps> = ({ content, onChange }) => {
  return (
    <List renderHeader={() => '评论内容'}>
      <TextareaItem
        value={content}
        rows={5}
        count={200}
        onChange={onChange}
      />
    </List>
  );
};

export default index;
