import React, { memo, useState } from 'react';
import OrderItem from '../OrderItem';
import { useDispatch } from 'umi';
import './style.css';

const data = [
  {
    id: 'o-2',
    statusText: '已消费',
    orderPicUrl:
      'https://p1.meituan.net/deal/95e79382c20a78da3068c4207ab7a9b4329494.jpg.webp@700w_700h_1e_1c_1l|watermark=1&&r=1&p=9&x=20&y=20',
    channel: '团购',
    title: '华莱士：华莱士单人套餐',
    text: ['1张 | 总价：￥11.99', '有效期至2018-09-17'],
    type: 1,
  },
];

const tabTitles = ['全部订单', '待付款', '可使用', '退款/售后'];

interface DataArray {
  id: number;
  state: number;
  pic: string;
  num: number;
  price: number;
  product: any;
}

interface OrderListProps {
  dataSource: Array<DataArray>;
}

const index: React.FC<OrderListProps> = memo(({dataSource}) => {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

  const cancelOrder = (id: number) => {
    dispatch({
      type: 'order/delOrder',
      payload: {
        id,
        data: dataSource,
      },
    });
  };

  const renderOrderList = () => {
    let data = dataSource || [];
    if (dataSource && currentTab > 0) data = dataSource.filter(data => data.state + 1 === currentTab)
    return data.map((item) => {
      return <OrderItem key={item.id} data={item} cancelOrder={cancelOrder} currentTab={currentTab} />;
    });
  };

  const renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon" />
        <div className="userMain__emptyText1">您还没有相关订单</div>
        <div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
      </div>
    );
  };

  const handleClickTab = (index: number) => {
    setCurrentTab(() => index);
  };

  return (
    <div className="userMain">
      <div className="userMain__menu">
        {tabTitles.map((item, index) => {
          return (
            <div
              key={index}
              className="userMain__tab"
              onClick={handleClickTab.bind(this, index)}
            >
              <span
                className={
                  currentTab === index
                    ? 'userMain__title userMain__title--active'
                    : 'userMain__title'
                }
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
      <div className="userMain__content">
        {data && data.length > 0 ? renderOrderList() : renderEmpty()}
      </div>
    </div>
  );
});

export default index;
