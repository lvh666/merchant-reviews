import React, { useState, useEffect } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  ShopModelState,
} from 'umi';
import Header from '@/components/Header';
import CommentPic from '@/pages/Comment/components/CommentPic';
import { List, InputItem, Button } from 'antd-mobile';
import { message } from 'antd';
import { AutoComplete } from 'react-bmapgl';

interface PicProps {
  uid: string;
  name: string;
  status: string;
  url: string;
}

const index = () => {
  const data = useSelector(({ shop }: { shop: ShopModelState }) => shop.shop);
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const [shop, setShop] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState<Array<PicProps>>([]);
  const [fileList, setFileList] = useState<Array<string>>([]);

  useEffect(() => {
    setShop(() => data?.shop || '');
    setCategory(() => data?.category || '');
    setAddress(() => data?.address || '');
    setRegion(() => data?.region || '');
    setPrice(() => data?.price || '');
    setFiles(() => [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: data?.pic,
      },
    ]);
    setFileList(() => [data?.pic || '']);
  }, [data]);

  useEffect(() => {
    dispatch({
      type: 'shop/getShopItem',
      payload: {
        id,
      },
    });
  }, []);

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
  };

  const handleAddress = (e: any) => {
    setAddress(() => e.item.value.city + e.item.value.business);
    setRegion(() => e.item.value.city);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
  };

  const submit = () => {
    if (!shop) {
      message.error('请输入餐馆名称');
    } else if (!category) {
      message.error('请输入类型');
    } else if (!address) {
      message.error('请输入地址');
    } else if (!price) {
      message.error('请输入菜品价格');
    } else if (isNaN(Number(price))) {
      message.error('请输入正确的菜品价格');
    } else if (!fileList.length) {
      message.error('请上传图片');
    } else {
      dispatch({
        type: 'shop/changeShop',
        payload: {
          id: +id,
          shop,
          category,
          address,
          region,
          price: +price,
          files: fileList[0],
        },
      });
    }
  };

  return (
    <div>
      <Header title="修改商家信息" onBack={handleBack} grey />
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
          onChange={handleAddressChange}
          //   onBlur={handleBlur}
          value={address}
          placeholder="请输入地址"
          id="address"
        >
          地址
        </InputItem>
        <AutoComplete input="address" onConfirm={handleAddress} />
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
        修改
      </Button>
    </div>
  );
};

export default index;
