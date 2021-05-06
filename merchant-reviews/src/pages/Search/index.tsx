import React, { useState, MouseEvent, useEffect } from 'react';
import { history, useDispatch } from 'umi';
import SearchBox from './components/SearchBox';
import PopularSearch from './components/PopularSearch';
import SearchHistory from './components/SearchHistory';

const index = () => {
  const [data, setData] = useState(['']);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('search-history') || '[]'));
  }, []);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLInputElement;
    const arr = data;
    const index = arr.indexOf(target.innerText);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    arr.unshift(target.innerText);
    setData(arr);

    dispatch({
      type: 'search/clearSearch'
    });
    
    localStorage.setItem('search-history', JSON.stringify(arr));
    history.push(`/searchResult/${target.innerText}`);
  };

  const handleClear = () => {
    localStorage.removeItem('search-history');
    setData([]);
  };

  return (
    <div>
      <SearchBox />
      <PopularSearch handleClick={handleClick} />
      <SearchHistory
        historyData={data}
        handleClick={handleClick}
        handleClear={handleClear}
      />
    </div>
  );
};

export default index;
