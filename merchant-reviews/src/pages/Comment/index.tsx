import React, { useState, ChangeEvent } from 'react';
import {
  history,
  useParams,
  useDispatch,
} from 'umi';
import Header from '@/components/Header';
import CommentRating from './components/CommentRating';
import CommentContent from './components/CommentContent';
import CommentPic from './components/CommentPic';
import { Button } from 'antd-mobile';
import { message } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';

export default function index() {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [fileList, setFileList] = useState<Array<string>>([]);

  const handlePicChange = (file: any) => {
    if (file.file.response) {
      const item = file.file.response.data.url as string;
      const index = fileList.indexOf(item)
      if(index !== -1) {
        setFileList(files => files.splice(index, 1))
      } else {
        setFileList(files => files.concat(item))
      }
    }
    setFiles(file.fileList);
  };

  const handleChange = (e: string) => {
    setContent(e);
  };

  const handleRatingChange = (
    event: ChangeEvent<{}>,
    value: number | null,
  ) => {
    setRating(() => value || 0);
  };

  const handleBack = () => {
    history.goBack();
  };

  const submit = () => {
    if (!rating) {
      message.error('请评分');
    } else if (!content) {
      message.error('评论内容不能为空');
    } else {
      dispatch({
        type: 'comment/addComment',
        payload: {
          username: localStorage.getItem('username'),
          shopId: +id,
          start: rating,
          content,
          files: fileList,
        },
      });
    }
  };

  return (
    <div>
      <Header title="评论" onBack={handleBack} grey />
      <CommentRating rating={rating} onChange={handleRatingChange} />
      <CommentContent content={content} onChange={handleChange} />
      <CommentPic num={3} fileList={files} handleChange={handlePicChange} />
      <Button onClick={submit} type="primary">
        发布
      </Button>
    </div>
  );
}
