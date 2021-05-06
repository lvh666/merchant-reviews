import React, { useEffect, useState } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  ShopModelState,
} from 'umi';
import Header from '@/components/Header';
import DiscountInfo from './components/DiscountInfo';
import DiscountBottom from './components/DiscountBottom';

const index = () => {
  const data = useSelector(({ shop }: { shop: ShopModelState }) => shop);
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch({
      type: 'shop/getAllDiscounts',
      payload: {
        id,
      },
    });
  }, []);

  const addGoods = (id: number) => {
    dispatch({
      type: 'shop/goodsDiscount',
      payload: {
        id,
        discount: data.discount,
      },
    });
  };

  const handleBack = () => {
    history.goBack();
  };

  const goAddresses = (url: string) => {
    history.push(`/${url}/${id}`);
  };

  return (
    <div>
      <Header title="推荐菜" onBack={handleBack} grey />
      <DiscountInfo addGoods={addGoods} data={data.discount} />
      {!!localStorage.getItem('login') && (
        <DiscountBottom addComment={goAddresses} />
      )}
    </div>
  );
};

export default index;
