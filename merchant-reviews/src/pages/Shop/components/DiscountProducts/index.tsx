import React from 'react';
import DiscountInfo from '@/pages/DiscountProducts/components/DiscountInfo';

interface DiscountProps {
  data: any;
  showDiscount: (url: string) => void;
  addShop: (id: number) => void;
}

const index: React.FC<DiscountProps> = ({ data, showDiscount, addShop }) => {
  return (
    <div className="detail">
      <div className="detail__more">
        <span>特惠菜品</span>
        <span className="detail__notice">({data.length})</span>
        <i className="detail__arrow" onClick={() => showDiscount('productList')} />
      </div>
      <DiscountInfo data={data} addGoods={addShop} />
    </div>
  );
};

export default index;
