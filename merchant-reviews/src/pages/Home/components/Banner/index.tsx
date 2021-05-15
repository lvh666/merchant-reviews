import React from 'react';
import './style.css';

interface BannerProps {
  dark: boolean;
}

const index: React.FC<BannerProps> = (props) => {
  const { dark } = props;
  const style = dark
    ? {
        backgroundImage:
          'url(https://www.dpfile.com/app/node-mobile-m-isomorphism-web/static/ee72da6bea423a71f81c4e0be8a1dcf7.png)',
      }
    : undefined;

  return (
    <header className="banner" style={style}>
      <div className="banner__title">
        {/* <span className="banner__logo" /> */}
        <span className="banner__text">吃喝玩乐，找优惠</span>
      </div>
    </header>
  );
};

export default index;
