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
import ShopOverview from './components/ShopOverview';
import ShopInfo from './components/ShopInfo';
import DiscountProducts from './components/DiscountProducts';
import ProductItem from './components/ProductItem';
import Detail from './components/Detail';
import ShopBottom from './components/ShopBottom';

const index = () => {
  const data = useSelector(({ shop }: { shop: ShopModelState }) => shop);
  const msg = useSelector(
    ({ comment }: { comment: CommentModelState }) => comment.msg,
  );
  const products = useSelector(
    ({ product }: { product: ProductModelState }) => product.data,
  );
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();

  useEffect(() => {
    dispatch({
      type: 'shop/getShopItem',
      payload: {
        id,
      },
    });

    dispatch({
      type: 'comment/isComment',
      payload: {
        username: localStorage.getItem('username'),
        id,
      },
    });

    dispatch({
      type: 'shop/getAllDiscounts',
      payload: {
        id,
      },
    });

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

  const goAddresses = (url: string) => {
    history.push(`/${url}/${id}`);
  };

  return (
    <div>
      <Header title="商家详情" onBack={handleBack} grey />
      <ShopOverview pic={data.shop.pic} />
      <ShopInfo data={data.shop} />
      <DiscountProducts data={products} showDiscount={goAddresses} addShop={addShop}/>
      <ProductItem data={data.discount} showDiscount={goAddresses} />
      <Detail id={id} showComment={goAddresses} num={data.shop.comment_quantity} />
      {!!localStorage.getItem('login') && msg === '用户未评论' && (
        <ShopBottom addComment={goAddresses} />
      )}
    </div>
  );
};

export default index;
