import React, { useState } from 'react';
import { history, useParams, useSelector, useDispatch } from 'umi';
import Header from '@/components/Header';
import AddDiscountText from './components/AddDiscountText';
import CommentPic from '@/pages/Comment/components/CommentPic';
import { Button } from 'antd-mobile';
import { message } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';

const index = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState([]);
  const [fileList, setFileList] = useState<Array<string>>([]);

  const handlePicChange = (file: any) => {
    if (file.file.response) {
      const item = file.file.response.data.url as string;
      const index = fileList.indexOf(item);
      if (index !== -1) {
        setFileList((files) => files.splice(index, 1));
      } else {
        setFileList((files) => files.concat(item));
      }
    }
    setFiles(file.fileList);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
  };

  const submit = () => {
    if (!name) {
      message.error('请输入菜品名称');
    } else if (!price) {
      message.error('请输入菜品价格');
    } else if (isNaN(Number(price))) {
      message.error('请输入正确的菜品价格');
    } else {
      dispatch({
        type: 'shop/addDiscount',
        payload: {
          id: +id,
          name,
          price: +price,
          files: fileList,
        },
      });
    }
  };

  return (
    <div>
      <Header title="添加推荐菜" onBack={handleBack} grey />
      <AddDiscountText
        name={name}
        price={price}
        handleNameChange={handleNameChange}
        handlePriceChange={handlePriceChange}
      />
      <CommentPic num={1} fileList={files} handleChange={handlePicChange} />
      <Button onClick={submit} type="primary">
        发布
      </Button>
    </div>
  );
};

export default index;
