import React, { useState, useEffect } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  ProductModelState,
} from 'umi';
import { message } from 'antd';
import Header from '@/components/Header';
import PurchaseForm from './components/PurchaseForm';
import Tip from '@/components/Tip';
import { addOrder } from '@/services/order';

const index = () => {
  const [isShow, setIsShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [oid, setID] = useState(0);
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const product = useSelector(
    ({ product }: { product: ProductModelState }) => product.product,
  );

  useEffect(() => {
    dispatch({
      type: 'product/loadDiscounts',
      payload: {
        id,
      },
    });
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const handleClick = async (num: number) => {
    const res = await addOrder({
      username: localStorage.getItem('username') || '',
      shopId: product.shop_id,
      productId: product.id,
      price: product.current_price,
      num,
      pic: product.picture,
      createTime: new Date().getTime(),
    });
    setPrice(() => Number((product.current_price * num).toFixed(2)));
    setID(() => +res.data.insertId);
    setIsShow(true);
  };

  const handleSuccess = () => {
    message.success('支付成功');
    dispatch({
      type: 'order/delOrder',
      payload: {
        id: oid,
        status: 1,
        data: [],
      },
    });
  };

  const handleCloseTip = () => {
    message.success('取消支付');
    history.push('/order');
  };
  return (
    <div>
      <Header title="下单" onBack={handleBack} />
      <PurchaseForm
        num={1}
        price={product.current_price}
        handleClick={handleClick}
      />
      <Tip
        isShow={isShow}
        id={oid}
        price={price}
        onClose={handleCloseTip}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default index;
