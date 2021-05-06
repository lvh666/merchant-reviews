import React from 'react';
import Header from '@/components/Header';
import ProductOverview from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import Detail from './components/Detail';
import Remark from './components/Remark';
import BuyButton from "./components/BuyButton";

const index = () => {
  const handleBack = () => {
    history.back();
  };

  return (
    <div>
      <Header title="团购详情" onBack={handleBack} grey />
      <ProductOverview />
      <ShopInfo />
      <Detail />
      <Remark />
      <BuyButton />
    </div>
  );
};

export default index;
