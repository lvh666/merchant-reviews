import React from 'react';
import './style.css';

interface ShopItemProps {
  data: {
    id: string;
    url: string;
    pic: string;
    shop: string;
    star: number;
    price: number;
    commentQuantity?: number;
    quantity?: number;
    region: string;
    category: string;
  };
}

const index: React.FC<ShopItemProps> = ({ data }) => {
  const { id, pic, shop, star, price, quantity, region, category } = data;
  return (
    <a className="shopItem" href={`/shop/${id}`}>
      <div
        className="shopItem__pic"
        style={{ backgroundImage: 'url(' + pic + ')' }}
      />
      <div className="shopItem__content">
        <div className="shopItem__title">{shop}</div>
        <div className="shopItem__comment">
          <span className={'shopItem__star shopItem__star--' + star} />
          <span className="shopItem__quantity">{quantity}</span>
          <span className="shopItem__price">{price}/人</span>
        </div>
        <div className="shopItem__info">
          <span className="shopItem__region">{region}</span>
          <span className="shopItem__category">{category}</span>
        </div>
      </div>
    </a>
  );
};

export default index;
