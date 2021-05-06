import React from 'react';
import './style.css';

type discount = {
  id: number;
  name: string;
  pic: string;
  goods: number;
  price: number;
};

interface DiscountProps {
  data: Array<discount>;
  showDiscount: (url: string) => void;
}

const index: React.FC<DiscountProps> = ({ data, showDiscount }) => {
  return (
    <div className="detail">
      <div className="detail__more">
        <span>推荐菜</span>
        <span className="detail__notice">({data.length})</span>
        <i className="detail__arrow" onClick={() => showDiscount('discount')} />
      </div>
      <div className="discount__content">
        {data.map((item, index) => {
          if (index < 3) {
            return (
              <a key={item.id} className="discount__item">
                <div className="discount__itemPic">
                  <img width="100%" height="100%" src={item.pic} />
                  <span className="discount__num">{item.goods}人推荐</span>
                </div>
                <div className="discount__itemTitle">{item.name}</div>
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export default index;
