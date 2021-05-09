import React, { useEffect } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  ShopModelState,
  ProductModelState,
} from 'umi';
import Header from '@/components/Header';
import ProductOverview from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import Detail from './components/Detail';
import Remark from './components/Remark';
import "./components/BuyButton/style.css";

const index = () => {
  const data = useSelector(({ shop }: { shop: ShopModelState }) => shop);
  const product = useSelector(
    ({ product }: { product: ProductModelState }) => product.product,
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
      type: 'product/loadDiscounts',
      payload: {
        id,
      },
    });
  }, []);

  const addShop = (id: number) => {
    history.push(`/purchase/${id}`);
  };

  const goAddresses = (id: number) => {
    history.push(`/shop/${id}`);
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Header title="特惠详情" onBack={handleBack} grey />
      <ProductOverview data={product} addShop={addShop} />
      <ShopInfo data={data.shop} showShop={goAddresses} />
      <Detail data={product} />
      <Remark startTime={product.start_time} endTime={product.end_time} />
      <a className="buyButton" onClick={() => addShop(product.id)} >立即购买</a>
    </div>
  );
};

export default index;
