import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector, LoginModelState } from 'umi';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';

const Login: React.FC = () => {
  const data = useSelector(({ login }: { login: LoginModelState }) => login);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent) => {
    const item = e.target as HTMLInputElement;
    if (item.name === 'username') {
      setUsername(item.value);
    } else if (item.name === 'password') {
      setPassword(item.value);
    }
  };

  const handleSubmit = () => {
    const reg = /^1[34578]\d{9}$/; /*定义验证表达式*/
    if (!username) {
      setError('手机号不能为空');
    } else if (!reg.test(username)) {
      setError('手机号格式不正确');
    } else if (!password) {
      setError('密码不能为空');
    } else if (password.length < 6 || password.length > 12) {
      setError('密码为6-12位');
    } else {
      dispatch({
        type: 'login/login',
        payload: {
          username,
          password,
        },
      });
    }
  };

  return (
    <>
      <LoginHeader />
      <LoginForm
        username={username}
        password={password}
        error={error}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
