import React from 'react';
import './style.css';

interface ShopProps {
  data: {
    id: number;
    shop: string;
    category: string;
    pic: string;
    region: string;
    price: number;
    address: string;
    star: number;
    comment_quantity: number;
  };
}

const index: React.FC<ShopProps> = (props) => {
  const data = props.data;
  return (
    <div className="shopInfos">
      <div className="shopInfo__middle">
        <div className="shopInfo__middleLeft">
          <div className="shopInfo__shopName">{data.shop}</div>
          <div className="shopInfo__starsWrapper">
            <span className="shopInfo__stars">
              <i
                className="shopInfo__stars--red"
                style={{ width: `${(data.star / 5) * 100}%` }}
              ></i>
            </span>
            <span className="shopInfo__desc" style={{ color: 'red' }}>
              {data.star}
            </span>
            <span className="shopInfo__desc">{data.comment_quantity}条</span>
            <span className="shopInfo__desc">¥{data.price}/人</span>
            {/* <span className="shopInfo__distance">{'>100km'}</span> */}
          </div>
        </div>
      </div>
      <div className="shopInfo__middle">
        <div className="shopInfo__middleLeft">
          <i className="shopInfo__locationIcon"></i>
          {data.address}
        </div>
        <div className="shopInfo__middleRight">
          <i className="shopInfo__phoneIcon"></i>
        </div>
      </div>
    </div>
  );
};

export default index;
