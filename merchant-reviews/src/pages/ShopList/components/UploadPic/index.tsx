import React from 'react';
import { ImagePicker } from 'antd-mobile';


interface CommentPicProps {
  fileList: any;
  num: number;
  handleChange: (files: any) => void;
}

const index: React.FC<CommentPicProps> = ({ fileList, num, handleChange}) => {

  return (
    <>
      <ImagePicker
          files={fileList}
          onChange={handleChange}
          selectable={fileList.length < num}
          multiple
        />
    </>
  );
};

export default index;
