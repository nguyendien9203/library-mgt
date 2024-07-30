import React from 'react';
import { Select } from 'antd';
import '../../assets/style/Style.css';

const { Option } = Select;

const MultipleSelect = ({ name, value, onChange, onBlur, options, placeholder, mode }) => {
  const handleChange = (selectedValue) => {
    console.log('name:', name, 'value:', selectedValue);
    onChange({ target: { name, value: selectedValue } });
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur({ target: { name, value } });
    }
  };

  // Tìm và hiển thị tên của các mục đã chọn
  const selectedValuesWithNames = value.map(val => {
    const selectedItem = options.find(item => item.id === val.id);
    return selectedItem ? selectedItem.id : val;
  });

  console.log('selectedValuesWithNames:', selectedValuesWithNames);

  return (
    <Select
      mode={mode}
      style={{
        width: '100%',
        marginBottom: '4px',
        fontSize: 'small',
        margin: '0'
      }}
      value={selectedValuesWithNames}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      tokenSeparators={[',']}
    >
      {options.map((option) => (
        <Option key={option.id} value={option.id} style={{ fontSize: 'small' }}>
          {option.name}
        </Option>
      ))}
    </Select>
  );
};

export default MultipleSelect;
