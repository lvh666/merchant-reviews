import React from 'react';
import './style.css';

interface UserHeaderProps {
  onBack: () => void;
}

const index: React.FC<UserHeaderProps> = (props) => {
  const { onBack } = props;
  return (
    <header className="userHeader">
      <div className="userHeader__back" onClick={onBack}>
        返回
      </div>
      {/* <div className="userHeader__list">
        <span className="userHeader__item">
          订单
        </span>
      </div> */}
    </header>
  );
};

export default index;
