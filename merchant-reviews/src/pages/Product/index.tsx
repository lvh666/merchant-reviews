import React, { useEffect } from 'react';
import Header from '@/components/Header';
import { history, useSelector, useDispatch, ProductModelState } from 'umi';
import ProductDetail from './components/ProductDetail';
import ProductBottom from './components/ProductBottom';

const index = () => {
  const products = useSelector(
    ({ product }: { product: ProductModelState }) => product.data,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'product/getProductItemByUserID',
      payload: {
        username: localStorage.getItem('username'),
      },
    });
  }, []);

  const handleChange = (id: number) => {
    history.push(`/product/changeItem/${id}`);
  };

  const handleDel = (id: number) => {
    dispatch({
      type: 'product/delProduct',
      payload: {
        id,
        products,
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
      <Header title="优惠商品列表" onBack={handleBack} grey />
      {products.map((product: any) => {
        return (
          <ProductDetail
            key={product.id}
            data={product}
            handleChange={handleChange}
            handleDel={handleDel}
          />
        );
      })}
      <ProductBottom addComment={goAddresses} />
    </div>
  );
};

export default index;
