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
}

const index: React.FC<ProductProps> = ({ data }) => {
  return (
    <div className="detail">
      <div className="detail__header">
        <span>团购详情</span>
        <i className="detail__headerIcon"></i>
      </div>
      <table cellPadding="0" cellSpacing="0" className="detail__table">
        <tbody>
          <tr className="detail__row">
            <th colSpan={3} className="detail__category">
              饮品
            </th>
          </tr>
          <tr className="detail__row">
            <td>{data.product}</td>
            <td className="detail__td--alignRight">1</td>
            <td className="detail__td--alignRight">{data.old_price}元</td>
          </tr>
          <tr className="detail__row">
            <td />
            <td className="detail__td--price">
              最高价值
              <br />
              <strong className="detail__td--priceNew">团购价</strong>
            </td>
            <td className="detail__td--price">
              {data.old_price}元
              <br />
              <strong className="detail__td--priceNew">
                {data.current_price}元
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="detail__remark">免费提供餐巾纸</div>
    </div>
  );
};

export default index;
