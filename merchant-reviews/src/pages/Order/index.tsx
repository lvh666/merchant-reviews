import React from 'react';
import { history } from 'umi'
import UserMain from './components/UserMain';
import UserHeader from './components/UserHeader';

const index = () => {
  const handleBack = () => {
    history.goBack()
  };
  return (
    <div>
      <UserHeader onBack={handleBack} />
      <UserMain />
    </div>
  );
};

export default index;
