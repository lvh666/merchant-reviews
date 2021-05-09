import React, { useEffect } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  ShopModelState,
  CommentModelState,
  ProductModelState,
} from 'umi';
import Header from '@/components/Header';
import DiscountInfo from './components/DiscountInfo';

const index = () => {
  const products = useSelector(
    ({ product }: { product: ProductModelState }) => product.data,
  );
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch({
      type: 'product/loadLikes',
      payload: {
        id,
      },
    });
  }, []);

  const addShop = (id: number) => {
    history.push(`/purchase/${id}`);
  };

  const handleBack = () => {
    history.goBack();
  };
  return (
    <div>
      <Header title="特惠列表" onBack={handleBack} grey />
      <DiscountInfo data={products} addGoods={addShop} />
    </div>
  );
};

export default index;
