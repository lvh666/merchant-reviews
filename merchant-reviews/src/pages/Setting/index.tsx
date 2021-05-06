import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  useDispatch,
  useSelector,
  RegisteredModelState,
  UserModelState,
} from 'umi';
import { message } from 'antd';
import 'antd/dist/antd.css';
import SettingForm from './components/SettingForm';
import SettingHeader from './components/SettingHeader';

const Setting: React.FC = () => {
  const error = useSelector(
    ({ registered }: { registered: RegisteredModelState }) => registered.error,
  );
  const user = useSelector(({ user }: { user: UserModelState }) => user.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [relName, setRelName] = useState('');

  useEffect(() => {
    setUsername(() => user?.username || '');
    setRelName(() => user?.name || '');
  }, [user]);

  const handleChange = (e: ChangeEvent) => {
    const item = e.target as HTMLInputElement;
    if (item.name === 'username') {
      setUsername(item.value);
    } else if (item.name === 'relName') {
      setRelName(item.value);
    }
  };

  const getCheckPhone = (username: string) => {
    dispatch({
      type: 'registered/checkPhone',
      payload: {
        username,
      },
    });
  };

  const handleSubmit = () => {
    const reg = /^1[34578]\d{9}$/; /*定义验证表达式*/
    if (!username) {
      message.error('手机号不能为空');
    } else if (!reg.test(username)) {
      message.error('手机号格式不正确');
    } else if (error === '手机号已注册' && username !== user?.username) {
      message.error('手机号已注册');
    } else if (!relName) {
      message.error('昵称不能为空');
    } else {
      dispatch({
        type: 'user/changeUser',
        payload: {
          id: user?.id,
          username,
          name: relName,
        },
      });
    }
  };

  return (
    <>
      <SettingHeader />
      <SettingForm
        relName={relName}
        username={username}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBlur={getCheckPhone}
      />
    </>
  );
};

export default Setting;
