import React, { useEffect } from 'react';
import './style.css';

interface TipProps {
  isShow: boolean;
  onClose: () => void;
  onSuccess: () => void;
  price: number;
  id: number;
}

const index: React.FC<TipProps> = (props) => {
  const { id, price, onClose, isShow, onSuccess } = props;

  useEffect(() => {
    if (isShow) {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price,
                  },
                  invoice_id: id,
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((detail) => {
              console.log(detail);
              if (detail.id) {
                onSuccess();
              }
            });
          },
          onCancel: () => {
            onClose();
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render('#payButton');
    }
  }, [isShow]);

  return (
    <div>
      {isShow && (
        <div className="tip">
          <div className="tip__alert">
            {/* <div className="tip__content">{message}</div> */}
            <div className="tip__content" id="payButton"></div>
            <div className="tip__btns">
            <a className="tip__btn" onClick={onClose}>
              取消支付
            </a>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
