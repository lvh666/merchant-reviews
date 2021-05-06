import React from 'react';
import './style.css';

interface ShopOverviewProps {
  pic: string;
}

const index: React.FC<ShopOverviewProps> = ({ pic }) => {
  return (
    <div className="productOverview">
      <div className="productOverview__header">
        <div className="productOverview__imgContainer">
          <img alt="" className="productOverview__img" src={pic} />
        </div>
      </div>
    </div>
  );
};

export default index;
