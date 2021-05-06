import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface CommentPicProps {
  fileList: any;
  num: number;
  handleChange: (files: any) => void;
}

const index: React.FC<CommentPicProps> = ({ fileList, num, handleChange}) => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="http://localhost:7001/uploadPic"
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList.length >= num ? null : uploadButton}
      </Upload>
    </>
  );
};

export default index;
