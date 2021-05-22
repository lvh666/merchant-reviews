import React, { useState, useEffect } from 'react';
import { history, useDispatch, useSelector, ShopModelState } from 'umi';
import Header from '@/components/Header';
import CommentPic from '@/pages/Comment/components/CommentPic';
import { List, InputItem, Picker, Button, Calendar } from 'antd-mobile';
import { message } from 'antd';
import 'antd-mobile/dist/antd-mobile.css';

const index = () => {
  const shops = useSelector(({ shop }: { shop: ShopModelState }) => shop.shops);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [shopId, setShopId] = useState([]);
  const [shopSelect, setShopSelect] = useState<any[]>([]);
  const [product, setProduct] = useState('');
  const [saleDesc, setSaleDesc] = useState('');
  const [tag, setTag] = useState(['免预约']);
  const [currentPrice, setCurrentPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [startTime, setStartTime] = useState<Date | undefined>(new Date());
  const [endTime, setEndTime] = useState<Date | undefined>(new Date());
  const [files, setFiles] = useState([]);
  const [fileList, setFileList] = useState<Array<string>>([]);
  const tags = [
    {
      label: '免预约',
      value: '免预约',
    },
    {
      label: '预约',
      value: '预约',
    },
  ];

  useEffect(() => {
    dispatch({
      type: 'shop/getShopItemByUserID',
      payload: {
        username: localStorage.getItem('username'),
      },
    });
  }, []);

  useEffect(() => {
    const data: any[] = []
    for (const shop of shops) {
      const item = {
        label: shop.shop,
        value: shop.id,
      };
      data.push(item);
    }
    setShopSelect(() => data);
  }, [shops]);

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

  const handleProductChange = (value: string) => {
    setProduct(() => value);
  };

  const handleSaleDesc = (value: string) => {
    setSaleDesc(() => value);
  };

  const handelChangeTag = (date: any) => {
    setTag(() => date);
  };

  const handelChangeShop = (date: any) => {
    setShopId(() => date);
  };

  const onConfirm = (
    startTime: Date | undefined,
    endTime: Date | undefined,
  ) => {
    setShow(() => false);
    setStartTime(() => startTime);
    setEndTime(() => endTime);
  };

  const handleCurrentPrice = (value: string) => {
    setCurrentPrice(() => value);
  };

  const handleOldPrice = (value: string) => {
    setOldPrice(() => value);
  };

  const submit = () => {
    if (!product) {
      message.error('请输入优惠商品');
    } else if (!saleDesc) {
      message.error('请输入描述');
    } else if (!shopId.length) {
      message.error('请输入选择餐馆');
    } else if (!currentPrice) {
      message.error('请输入优惠价格');
    } else if (isNaN(Number(currentPrice))) {
      message.error('请输入正确的优惠价格');
    } else if (!oldPrice) {
      message.error('请输入优惠前价格');
    } else if (isNaN(Number(oldPrice))) {
      message.error('请输入正确的优惠前价格');
    } else if (isNaN(Number(oldPrice))) {
      message.error('请输入正确的优惠前价格');
    } else if (!fileList.length) {
      message.error('请上传图片');
    } else {
      dispatch({
        type: 'product/addProduct',
        payload: {
          shopId: shopId[0],
          product,
          saleDesc,
          tag: tag[0],
          startTime: startTime?.getTime(),
          endTime: endTime?.getTime(),
          currentPrice: +currentPrice,
          oldPrice: +oldPrice,
          files: fileList[0],
        },
      });
    }
  };

  return (
    <div>
      <Header title="上架优惠商品" onBack={handleBack} grey />
      <List renderHeader={() => '优惠商品信息'}>
        <InputItem
          onChange={handleProductChange}
          value={product}
          placeholder="请输入优惠商品名称"
        >
          优惠商品名称
        </InputItem>
        <InputItem
          onChange={handleSaleDesc}
          value={saleDesc}
          placeholder="请输入优惠商品描述"
        >
          描述
        </InputItem>
        <Picker data={shopSelect} value={shopId} cols={1} onChange={handelChangeShop}>
          <List.Item arrow="horizontal">餐馆</List.Item>
        </Picker>
        <Picker data={tags} value={tag} cols={1} onChange={handelChangeTag}>
          <List.Item arrow="horizontal">是否预约</List.Item>
        </Picker>
        <InputItem
          onChange={handleCurrentPrice}
          value={currentPrice}
          placeholder="请输入优惠价格"
          extra="¥"
        >
          优惠价格
        </InputItem>
        <InputItem
          onChange={handleOldPrice}
          value={oldPrice}
          placeholder="请输入优惠前价格"
          extra="¥"
        >
          优惠前价格
        </InputItem>
        <List.Item
          onClick={() => {
            setShow((show) => !show);
          }}
          arrow="horizontal"
        >
          选择优惠日期区间
        </List.Item>
        {startTime && (
          <List.Item>开始日期: {startTime.toLocaleDateString()}</List.Item>
        )}
        {endTime && (
          <List.Item>结束日期: {endTime.toLocaleDateString()}</List.Item>
        )}
      </List>
      <Calendar
        visible={show}
        minDate={new Date()}
        onCancel={() => {
          setShow((show) => !show);
        }}
        onConfirm={onConfirm}
      />
      <List renderHeader={() => '优惠商品图片'}>
        <CommentPic num={1} fileList={files} handleChange={handlePicChange} />
      </List>
      <Button onClick={submit} type="primary">
        上架
      </Button>
    </div>
  );
};

export default index;
