import React from 'react';
import './style.css';

interface DataArray {
  id: number;
  state: number;
  pic: string;
  num: number;
  price: number;
  product: any;
}

interface OrderItemProps {
  data: DataArray;
  cancelOrder: (id: number) => void;
}

const index: React.FC<OrderItemProps> = ({ data, cancelOrder }) => {
  const { id, product, price, state, num } = data;

  return (
    <div className="orderItem">
      <div className="orderItem__title">
        <span>{product && product.product}</span>
      </div>
      <div className="orderItem__main">
        <div className="orderItem__imgWrapper">
          <div className="orderItem__tag">已消费</div>
          <img
            alt=""
            className="orderItem__img"
            src={product && product.picture}
          />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__line">
            {num} | 总价：￥{num * price}
          </div>
          <div className="orderItem__line">
            有效期至{product && product.end_time.slice(0, 10)}
          </div>
        </div>
      </div>
      <div className="orderItem__bottom">
        <div className="orderItem__type">团购</div>
        {state !== 2 && <div>
          <div className="orderItem__btn" onClick={() => cancelOrder(id)}>
            取消
          </div>
        </div>}
      </div>
    </div>
  );
};

export default index;
