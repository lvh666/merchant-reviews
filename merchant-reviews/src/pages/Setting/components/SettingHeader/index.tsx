import React from 'react';
import { Link } from 'umi';
import './style.css';

const index: React.FC = () => {
  return (
    <div className="loginHeader">
      <Link to="/user" className="loginHeader__back"></Link>
      <div className="loginHeader__title">修改个人信息</div>
    </div>
  );
};

export default index;
