import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector, RegisteredModelState } from 'umi';
import { message } from 'antd';
import 'antd/dist/antd.css';
import RegisteredForm from './components/RegisteredForm';
import RegisteredHeader from './components/RegisteredHeader';

const Registered: React.FC = () => {
  const error = useSelector(
    ({ registered }: { registered: RegisteredModelState }) => registered.error,
  );
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [relName, setRelName] = useState('');
  const [relPassword, setRelPassword] = useState('');

  const handleChange = (e: ChangeEvent) => {
    const item = e.target as HTMLInputElement;
    if (item.name === 'username') {
      setUsername(item.value);
    } else if (item.name === 'password') {
      setPassword(item.value);
    } else if (item.name === 'relName') {
      setRelName(item.value);
    } else if (item.name === 'relPassword') {
      setRelPassword(item.value);
    }
  };

  const getCheckPhone = (username: string) => {
    dispatch({
      type: 'registered/checkPhone',
      payload: {
        username,
      },
    });
  }

  const handleSubmit = () => {
    const reg = /^1[34578]\d{9}$/; /*定义验证表达式*/
    if (!username) {
      message.error('手机号不能为空');
    } else if (!reg.test(username)) {
      message.error('手机号格式不正确');
    } else if (error === '手机号已注册') {
      message.error('手机号已注册');
    } else if (!relName) {
      message.error('昵称不能为空');
    } else if (!password) {
      message.error('密码不能为空');
    } else if (password.length < 6 || password.length > 12) {
      message.error('密码为6-12位');
    } else if (!relPassword) {
      message.error('确认密码不能为空');
    } else if (relPassword !== password) {
      message.error('请确保两次输入的密码一致');
    } else {
      dispatch({
        type: 'registered/registered',
        payload: {
          username,
          password,
          relName
        },
      });
    }
  };

  return (
    <>
      <RegisteredHeader />
      <RegisteredForm
        relName={relName}
        username={username}
        password={password}
        relPassword={relPassword}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={getCheckPhone}
      />
    </>
  );
};

export default Registered;
