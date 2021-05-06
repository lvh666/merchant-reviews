import React, { ChangeEvent } from 'react';
import './style.css';

interface RegisteredFormProps {
  relName: string;
  username: string;
  onChange: (e: ChangeEvent) => void;
  onSubmit: () => void;
  onBlur: (username: string) => void;
}

const index: React.FC<RegisteredFormProps> = (props) => {
  const { relName, username, onChange, onSubmit, onBlur } = props;
  return (
    <div className="loginForm">
      <div className="loginForm__inputContainer">
        <div className="loginForm__row">
          <label className="loginForm__mobileLabel">+86</label>
          <input
            className={"loginForm__input"}
            name="username"
            value={username}
            onChange={onChange}
            onBlur={() => onBlur(username)}
          />
        </div>
        <div className="loginForm__row">
          <label className="loginForm__passwordLabel">昵称</label>
          <input
            className={"loginForm__input"}
            name="relName"
            value={relName}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="loginForm__btnContainer">
        <button className="loginForm__btn" onClick={onSubmit}>
          修改
        </button>
      </div>
    </div>
  );
};

export default index;
