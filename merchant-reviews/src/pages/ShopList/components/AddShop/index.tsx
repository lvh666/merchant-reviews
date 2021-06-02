import React, { useState, useEffect } from 'react';
import { history, useParams, useSelector, useDispatch } from 'umi';
import Header from '@/components/Header';
import CommentPic from '@/pages/Comment/components/CommentPic';
import { List, InputItem } from 'antd-mobile';
import { Button } from 'antd-mobile';
import { message } from 'antd';
import { AutoComplete } from 'react-bmapgl';
import 'antd-mobile/dist/antd-mobile.css';

const index = () => {
  const dispatch = useDispatch();
  const [shop, setShop] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
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

  const handleShopChange = (value: string) => {
    setShop(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleAddressChange = (value: string) => {
    setAddress(() => value);
    // setRegion(() => value.split('市')[0]);
  };

  const handleAddress = (e: any) => {
    setAddress(() => e.item.value.city + e.item.value.business);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
  };

  const submit = () => {
    const reg = /^1[3,5,8]\d{9}$/;
    if (!shop) {
      message.error('请输入餐馆名称');
    } else if (!category) {
      message.error('请输入类型');
    } else if (!phone) {
      message.error('请输入联系电话');
    } else if (!reg.test(phone)) {
      message.error('请输入正确的联系电话');
    } else if (!region) {
      message.error('请输入城市');
    } else if (!address) {
      message.error('请输入地址');
    } else if (!price) {
      message.error('请输入人均价格');
    } else if (isNaN(Number(price))) {
      message.error('请输入正确的人均价格');
    } else if (!fileList.length) {
      message.error('请上传图片');
    } else {
      dispatch({
        type: 'shop/addShop',
        payload: {
          username: localStorage.getItem('username'),
          shop,
          category,
          address,
          region,
          phone,
          price: +price,
          files: fileList[0],
        },
      });
    }
  };

  return (
    <div>
      <Header title="商家入驻" onBack={handleBack} grey />
      <List renderHeader={() => '商家信息'}>
        <InputItem
          onChange={handleShopChange}
          value={shop}
          placeholder="请输入餐馆名称"
        >
          餐馆名称
        </InputItem>
        <InputItem
          onChange={handleCategoryChange}
          value={category}
          placeholder="请输入类型"
        >
          类型
        </InputItem>
        <InputItem
          onChange={(value) => setPhone(() => value)}
          value={phone}
          placeholder="请输入联系电话"
        >
          电话
        </InputItem>
        <InputItem
          onChange={(value) => setRegion(() => value)}
          value={region}
          placeholder="请输入城市"
        >
          城市
        </InputItem>
        <InputItem
          onChange={handleAddressChange}
          //   onBlur={handleBlur}
          value={address}
          placeholder="请输入地址"
          id="address"
        >
          地址
        </InputItem>
        <AutoComplete
          input="address"
          location={region}
          onConfirm={handleAddress}
        />
        <InputItem
          onChange={handlePriceChange}
          value={price}
          placeholder="请输入人均价格"
          extra="¥"
        >
          价格
        </InputItem>
      </List>
      <List renderHeader={() => '商家图片'}>
        <CommentPic num={1} fileList={files} handleChange={handlePicChange} />
      </List>
      <Button onClick={submit} type="primary">
        入驻
      </Button>
    </div>
  );
};

export default index;
