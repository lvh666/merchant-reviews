import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { history, useSelector, useDispatch, ShopModelState } from 'umi';
import ShopDetail from './components/ShopDetail';
import ShopBottom from './components/ShopBottom';

const index = () => {
  const shops = useSelector(({ shop }: { shop: ShopModelState }) => shop.shops);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'shop/getShopItemByUserID',
      payload: {
        username: localStorage.getItem('username'),
      },
    });
  }, []);

  const handleChange = (id: number) => {
    history.push(`/shop/changeItem/${id}`);
  };

  const handleDel = (id: number) => {
    dispatch({
        type: 'shop/delShop',
        payload: {
          id,
          shops
        },
      });
  };

  const goAddresses = (url: string) => {
    history.push(`/${url}`);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Header title="餐馆列表" onBack={handleBack} grey />
      {shops.map((shop: any) => {
        return (
          <ShopDetail
            key={shop.id}
            data={shop}
            handleChange={handleChange}
            handleDel={handleDel}
          />
        );
      })}
      <ShopBottom addComment={goAddresses} />
    </div>
  );
};

export default index;
