import React from 'react';
import './style.css';

interface HeaderProps {
    grey?: boolean,
    title: string,
    onBack: () => void
}

const index: React.FC<HeaderProps> = (props) => {
  const { grey, title, onBack } = props;
  const backgroundColor = grey ? '#f0f0f0' : '#fff';

  return (
    <header className="headers" style={{ backgroundColor: backgroundColor }}>
      <div className="header__back" onClick={onBack}>
        返回
      </div>
      <div className="header__title">{title}</div>
    </header>
  );
};

export default index;
