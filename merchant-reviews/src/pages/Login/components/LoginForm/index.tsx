import React, { ChangeEvent } from 'react';
import { Link } from 'umi';
import './style.css';

interface LoginFormProps {
  username: string;
  password: string;
  error: string;
  onChange: (e: ChangeEvent) => void;
  onSubmit: () => void;
}

const index: React.FC<LoginFormProps> = (props) => {
  const { username, password, error, onChange, onSubmit } = props;
  return (
    <div className="loginForm">
      <div className="loginForm__inputContainer">
        {error != '' ? (
          <div className="loginForm__row">
            <span className={'login__error'}>{error}</span>
          </div>
        ) : (
          ''
        )}
        <div className="loginForm__row">
          <label className="loginForm__mobileLabel">+86</label>
          <input
            className={'loginForm__input'}
            name="username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="loginForm__row">
          <label className="loginForm__passwordLabel">密码</label>
          <input
            className={'loginForm__input'}
            name="password"
            type="password"
            value={password}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="loginForm__btnContainer">
        <button className="loginForm__btn" onClick={onSubmit}>
          登录
        </button>
        <Link className="registered__btn" to="registered">
          还没有账号,注册一个
        </Link>
      </div>
    </div>
  );
};

export default index;
