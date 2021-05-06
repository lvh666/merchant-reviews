import React from 'react';
import { Link } from 'umi';
import './style.css';

interface KeywordBoxProps {
  text: string;
}

const index: React.FC<KeywordBoxProps> = ({ text }) => {
  return (
    <div className="keywordBox">
      <Link to={`/search?keyWords=${text}`} className="keywordBox__text">
        {text}
      </Link>
    </div>
  );
};

export default index;
