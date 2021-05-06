import React from 'react';
import { history, useDispatch } from 'umi';
import UserMain from './components/UserMain';
import UserHeader from './components/UserHeader';
import UserList from './components/UserList';

const index = () => {
  const dispatch = useDispatch();
  const handleBack = () => {
    history.push('/');
  };

  const handleLogout = () => {
    dispatch({
      type: 'login/logout',
    });
  };
  return (
    <div>
      <UserHeader onBack={handleBack} onLogout={handleLogout} />
      <UserMain />
      <UserList />
    </div>
  );
};

export default index;
