import React, { useState } from 'react';
import { message } from 'antd';
import Tip from '@/components/Tip';
import { useDispatch, history } from 'umi';
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
  currentTab: number;
  cancelOrder: (id: number) => void;
}

const index: React.FC<OrderItemProps> = ({ data, cancelOrder }) => {
  const { id, product, price, state, num } = data;
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const tag = ['未支付', '已支付', '退款中', '已取消'];

  const handleClick = () => {
    setIsShow(() => true);
  };

  const handleSuccess = () => {
    message.success('支付成功');
    dispatch({
      type: 'order/delOrder',
      payload: {
        id,
        status: 1,
        data: [],
      },
    });
    history.push('/order');
    setIsShow(() => false);
    location.reload();
  };

  return (
    <div className="orderItem">
      <div className="orderItem__title">
        <span>{product && product.product}</span>
      </div>
      <div className="orderItem__main">
        <div className="orderItem__imgWrapper">
          <div className="orderItem__tag">{tag[data.state]}</div>
          <img
            alt=""
            className="orderItem__img"
            src={product && product.picture}
          />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__line">
            数量：{num} | 总价：￥{(num * price).toFixed(2)}
          </div>
          <div className="orderItem__line">
            有效期至{product && product.end_time.slice(0, 10)}
          </div>
        </div>
      </div>
      <div className="orderItem__bottom">
        <div className="orderItem__type">团购</div>
        <div>
          {state === 0 && (
            <div className="orderItem__btn" onClick={handleClick}>
              支付
            </div>
          )}
          {state !== 2 && (
            <div className="orderItem__btn" onClick={() => cancelOrder(id)}>
              退款
            </div>
          )}
        </div>
      </div>
      <Tip
        isShow={isShow}
        id={id}
        price={num * price}
        onClose={() => {
          setIsShow(() => false);
          message.success('取消支付');
        }}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default index;
