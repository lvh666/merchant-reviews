import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

interface likeItemProps {
  data: {
    id: number;
    shop: string;
    category: string;
    pic: string;
    region: string;
    price: number;
    oldPrice: number;
    address: string;
  };
}

const index: React.FC<likeItemProps> = (props) => {
  const {
    id,
    shop,
    category,
    pic,
    region,
    price,
    oldPrice,
    address,
  } = props.data;

  return (
    <Link to={`/productDetail?id=${id}`} className="likeItem">
      <div className="likeItem__picContainer">
        <div className="likeItem__picTag">{category}</div>
        <img className="likeItem__pic" src={pic} />
      </div>
      <div className="likeItem__content">
        <div className="likeItem__shop">{shop}</div>
        <div className="likeItem__product">{address}</div>
        <div className="likeItem__detail">
          <div className="likeItem__price">
            <ins className="likeItem__currentPrice">{price}</ins>
            <del className="likeItem__oldPrice">{price + 10}</del>
          </div>
          <div className="likeItem__sale">{region}</div>
        </div>
      </div>
    </Link>
  );
};

export default index;
