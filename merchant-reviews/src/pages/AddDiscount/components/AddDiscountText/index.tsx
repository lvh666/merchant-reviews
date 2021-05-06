import React from 'react';
import { List, InputItem } from 'antd-mobile';

interface AddDiscountTextProps {
  name: string;
  price: string;
  handleNameChange: (value: string) => void;
  handlePriceChange: (value: string) => void;
}

const index: React.FC<AddDiscountTextProps> = ({
  name,
  price,
  handlePriceChange,
  handleNameChange,
}) => {
  return (
    <div>
      <List renderHeader={() => ''}>
        <InputItem
          onChange={handleNameChange}
          value={name}
          placeholder="请输入菜品名称"
        >
          菜名
        </InputItem>
        <InputItem
          onChange={handlePriceChange}
          value={price}
          placeholder="请输入菜品价格"
          extra="¥"
        >
          价格
        </InputItem>
      </List>
    </div>
  );
};

export default index;
