import React, { useState } from 'react';
import "./style.css";

interface TipProps {
  num: number;
  price: number;
  handleClick: (num: number) => void;
}

const index: React.FC<TipProps> = (props) => {
  const { num, price, handleClick } = props;
  const [ number, setNumber ]= useState(num)
  const handleDecrease = () => {
    if (number > 1) setNumber((number) => number - 1)
  };

  const handleIncrease = () => {
    setNumber((number) => number + 1)
  };

  return (
    <div className="purchaseForm">
      <div className="purchaseForm__wrapper">
        <div className="purchaseForm__row">
          <div className="purchaseForm__rowLabel">数量</div>
          <div className="purchaseForm__rowValue">
            <span
              className="purchaseForm__counter--dec"
              onClick={handleDecrease}
            >
              -
            </span>
            <input
              className="purchaseForm__quantity"
              value={number}
            />
            <span
              className="purchaseForm__counter--inc"
              onClick={handleIncrease}
            >
              +
            </span>
          </div>
        </div>
        <div className="purchaseForm__row">
          <div className="purchaseForm__rowLabel">小计</div>
          <div className="purchaseForm__rowValue">
            <span className="purchaseForm__totalPrice">¥{ (number * price).toFixed(2) }</span>
          </div>
        </div>
        <div className="purchaseForm__row">
          <div className="purchaseForm__rowLabel">手机号码</div>
          <div className="purchaseForm__rowValue">{localStorage.getItem('username')}</div>
        </div>
      </div>
      <ul className="purchaseForm__remark">
        <li className="purchaseForm__remarkItem">
          <i className="purchaseForm__sign" />
          <span className="purchaseForm__desc">支持随时退</span>
        </li>
        <li>
          <i className="purchaseForm__sign" />
          <span className="purchaseForm__desc">支持过期退</span>
        </li>
      </ul>
      <a className="purchaseForm__submit" onClick={() => handleClick(number)}>
        提交订单
      </a>
    </div>
  );
};

export default index;
