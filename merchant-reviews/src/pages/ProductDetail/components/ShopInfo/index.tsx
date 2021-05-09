import React from 'react';
import "./style.css"

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
  showShop: (id: number) => void;
}

const index: React.FC<ShopProps> = ({ data, showShop }) => {
    return (
        <div className="shopInfo">
        <div className="shopInfo__header">
          使用商户
          <span className="shopInfo__arrow"></span>
        </div>
        <div className="shopInfo__middle" onClick={() => showShop(data.id)}>
          <div className="shopInfo__middleLeft">
            <div className="shopInfo__shopName">
            {data.shop}
            </div>
            <div className="shopInfo__starsWrapper">
              <span className="shopInfo__stars">
              <i className="shopInfo__stars--red" style={{"width": `${(data.star / 5) * 100}%`}}></i>
              </span>
            </div>
          </div>
          <div className="shopInfo__middleRight">
            <i className="shopInfo__phoneIcon"></i>
          </div>
        </div>
        <div className="shopInfo__bottom">
          <i className="shopInfo__locationIcon"></i>{data.address}
        </div>
      </div>
    );
};

export default index;