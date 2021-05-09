import React from 'react';
import './style.css';

interface ProductProps {
  data: {
    id: number;
    product: string;
    old_price: number;
    current_price: number;
    picture: string;
    sale_desc: string;
    tag: string;
    create_time: string;
    shop_id: number;
  };
  addShop: (id: number) => void;
}

const index: React.FC<ProductProps> = ({ data, addShop }) => {
  return (
    <div className="productOverview">
      <div className="productOverview__header">
        <div className="productOverview__imgContainer">
          <img alt="" className="productOverview__img" src={data.picture} />
        </div>
        <div className="productOverview__baseInfo">
          <div className="productOverview__title">{data.product}</div>
          <div className="productOverview__content">{data.sale_desc}</div>
        </div>
      </div>
      <div className="productOverview__purchase">
        <span className="productOverview__symbol">¥</span>
        <span className="productOverview__price">{data.current_price}</span>
        <span className="productOverview__price--old">¥{data.old_price}</span>
        <a className="productOverview__btn" onClick={() => addShop(data.id)}>立即购买</a>
      </div>
      <ul className="productOverview__remark">
        <li className="productOverview__remarkItem">
          <i className="productOverview__sign1" />
          <span className="productOverview__desc">随时可退</span>
        </li>
        <li className="productOverview__remarkItem">
          <i className="productOverview__sign2" />
          <span className="productOverview__desc">过期自动退</span>
        </li>
      </ul>
    </div>
  );
};

export default index;
