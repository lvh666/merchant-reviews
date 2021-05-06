import React, { ChangeEvent, useState } from 'react';
import { history, useLocation } from 'umi';
import H from 'history';
import './style.css';

const data = [
  {
    id: 1,
    keyword: '火锅',
    quantity: 8710,
  },
  {
    id: 2,
    keyword: '火锅自助',
    quantity: 541,
  },
  {
    id: 3,
    keyword: '火锅 三里屯',
    quantity: 65,
  },
  {
    id: 4,
    keyword: '火锅 望京',
    quantity: 133,
  },
  {
    id: 5,
    keyword: '火锅家常菜',
    quantity: 179,
  },
];
interface Location extends H.Location {
  query: { [key: string]: string };
}

const index = () => {
  const { query } = useLocation() as Location;
  const [inputText, setInputText] = useState(query.keyWords || '');

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInputText(target.value);
  };

  const handleClear = () => {
    setInputText('');
  };

  const handleCancel = () => {
    history.goBack();
  };
  
  const handleSearch = () => {
    const arr = JSON.parse(localStorage.getItem('search-history') || '[]');
    const index = arr.indexOf(inputText);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    arr.unshift(inputText);

    localStorage.setItem('search-history', JSON.stringify(arr));
    history.push(`/searchResult/${inputText}`);
  };

  const renderSuggestList = () => {
    return (
      <ul className="searchBox__list">
        {data.map((item) => {
          return (
            <li className="searchBox__item" onClick={handleSearch}>
              <span className="searchBox__itemKeyworkd">{item.keyword}</span>
              <span className="searchBox__itemQuantity">
                约{item.quantity}个结果
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="searchBox">
      <div className="searchBox__container">
        <input
          className="searchBox__text"
          value={inputText}
          onChange={handleChange}
        />
        <span className="searchBox__clear" onClick={handleClear}></span>
        {inputText.length > 0 ? (
          <span className="searchBox__cancel" onClick={handleSearch}>
            搜索
          </span>
        ) : (
          <span className="searchBox__cancel" onClick={handleCancel}>
            取消
          </span>
        )}
      </div>
      {inputText.length > 0 ? renderSuggestList() : null}
    </div>
  );
};

export default index;
