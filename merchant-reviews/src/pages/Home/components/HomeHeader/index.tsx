import React from 'react';
import { Link } from 'umi';
import './style.css';

const index = () => {
  return (
    <div className="homeHeader">
      <header className="homeHeader__wrapper">
        <a className="homeHeader__city">成都</a>
        <Link to={'/search'} className="homeHeader__search">输入商户名、地点</Link>
        <Link to={localStorage.getItem('login') ? '/user' :'/login'} className="homeHeader__self">
          <div className="homeHeader__portrait" />
        </Link>
      </header>
    </div>
  );
};

export default index;
