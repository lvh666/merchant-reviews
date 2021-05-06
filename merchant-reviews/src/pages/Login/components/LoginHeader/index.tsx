import React from 'react';
import { Link } from 'umi';
import './style.css';

const index: React.FC = () => {
  return (
    <div className="loginHeader">
      <Link to="/" className="loginHeader__back"></Link>
      <div className="loginHeader__title">账号密码登录</div>
    </div>
  );
};

export default index;
