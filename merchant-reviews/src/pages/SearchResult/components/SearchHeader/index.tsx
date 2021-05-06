import React from 'react';
import './style.css';

interface SearchHeaderProps {
  onBack: () => void;
  onSearch: () => void;
}

const index: React.FC<SearchHeaderProps> = ({ onBack, onSearch }) => {
  return (
    <header className="searchHeader">
      <div className="searchHeader__back" onClick={onBack}></div>
      <div className="searchHeader__icon" onClick={onSearch}></div>
    </header>
  );
};

export default index;
