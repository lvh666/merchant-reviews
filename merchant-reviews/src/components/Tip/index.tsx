import React from 'react';
import "./style.css"

interface TipProps {
    message: string;
    onClose: () => void
}

const index: React.FC<TipProps> = (props) => {
    const { message, onClose } = props;
    return (
        <div className="tip">
        <div className="tip__alert">
          <div className="tip__content">{message}</div>
          <div className="tip__btns">
            <a className="tip__btn" onClick={onClose}>
              确定
            </a>
          </div>
        </div>
      </div>
    );
};

export default index;