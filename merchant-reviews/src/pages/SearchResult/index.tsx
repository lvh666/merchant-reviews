import React, { useState } from 'react';
import { history, useParams } from 'umi';
import ShopList from './components/ShopList';
import SearchHeader from './components/SearchHeader';
import KeywordBox from './components/KeywordBox';
import Banner from '@/components/Banner';

const index = () => {
  const { keyWords }: {keyWords: string} = useParams()
  const [inputText, setInputText] = useState(keyWords || '');

  const handleBack = () => {
    history.push('/');
  };

  const handleSearch = () => {
    history.push('/search');
  };

  return (
    <div>
      <SearchHeader onBack={handleBack} onSearch={handleSearch} />
      <KeywordBox text={inputText} />
      {/* <Banner dark /> */}
      <ShopList text={inputText} />
    </div>
  );
};

export default index;
