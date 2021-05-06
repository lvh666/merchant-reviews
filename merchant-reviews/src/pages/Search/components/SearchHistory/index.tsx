import React, { useState, MouseEvent } from 'react';
import { history } from 'umi';
import './style.css';

interface SearchResultProps {
  historyData: Array<string>;
  handleClick: (event: MouseEvent) => void;
  handleClear: () => void;
}

const index: React.FC<SearchResultProps> = ({ historyData, handleClick, handleClear }) => {

  return (
    <div className="searchHistory">
      <div className="searchHistory__header">搜索记录</div>
      <ul className="searchHistory__list">
        {historyData.map((item: string) => {
          return (
            <li
              key={item}
              onClick={handleClick}
              className="searchHistory__item"
            >
              {item}
            </li>
          );
        })}
      </ul>
      {historyData.length ? (
        <div className="searchHistory__clear" onClick={handleClear}>
          清除搜索记录
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default index;
