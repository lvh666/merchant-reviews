import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'react-bmapgl';
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
  // const [address, setAddress] = useState(new BMapGL.Point(116.404449, 39.914889))
  
  // useEffect(() => {
  //   //创建地址解析器实例
  //   const myGeo = new BMapGL.Geocoder();
  //   // 将地址解析结果显示在地图上，并调整地图视野
  //   myGeo.getPoint(
  //     data.address,
  //     function (point) {
  //       if (point) {
  //         setAddress(() => point)
  //       }
  //     },
  //     '',
  //   );
  // }, [])

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
      {/* <Map
        center={address}
        zoom={18}
      >
        <Marker
          position={address}
          enableDragging
        />
      </Map> */}
    </div>
  );
};

export default index;
