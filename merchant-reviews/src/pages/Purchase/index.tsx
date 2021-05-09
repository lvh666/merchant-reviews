import React, { useState, useEffect } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  ProductModelState,
} from 'umi';
import Header from '@/components/Header';
import PurchaseForm from './components/PurchaseForm';
import Tip from '@/components/Tip';

const index = () => {
  const [isShow, setIsShow] = useState(false);
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

  const handleClick = (num: number) => {
    dispatch({
      type: 'order/createOrder',
      payload: {
        username: localStorage.getItem('username'),
        shopId: product.shop_id,
        productId: product.id,
        price: product.current_price,
        num,
      },
    });
    setIsShow(true);
  };

  const handleCloseTip = () => {
    history.push('/');
  };
  return (
    <div>
      <Header title="下单" onBack={handleBack} />
      <PurchaseForm
        num={1}
        price={product.current_price}
        handleClick={handleClick}
      />
      <Tip isShow={isShow} message="购买成功！" onClose={handleCloseTip} />
    </div>
  );
};

export default index;
