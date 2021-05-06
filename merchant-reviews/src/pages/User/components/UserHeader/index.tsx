import React from 'react';
import './style.css';

interface UserHeaderProps {
  onBack: () => void;
  onLogout: () => void;
}

const index: React.FC<UserHeaderProps> = (props) => {
  const { onBack, onLogout } = props;
  return (
    <header className="userHeader">
      <div className="userHeader__back" onClick={onBack}>
        首页
      </div>
      {localStorage.getItem('login') ? (
        <div className="userHeader__right" onClick={onLogout}>
          注销
        </div>
      ) : (
        ''
      )}
    </header>
  );
};

export default index;
