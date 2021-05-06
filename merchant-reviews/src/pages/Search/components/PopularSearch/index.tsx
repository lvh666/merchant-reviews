import React, { useState, MouseEvent, useEffect } from 'react';
import { history } from 'umi';
import './style.css';

const popData = [
  '三里屯',
  '朝阳大悦城',
  '西单',
  '海底捞',
  '星巴克',
  '局气',
  '火锅',
  '温泉',
  '烤鸭',
];

interface PopularSearchProps {
  handleClick: (event: MouseEvent) => void;
}

const index: React.FC<PopularSearchProps> = ({ handleClick }) => {

  return (
    <div className="popularSearch">
      {popData.map((item, index) => {
        return (
          <span
            key={index}
            onClick={handleClick}
            className="popularSearch__item"
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default index;
