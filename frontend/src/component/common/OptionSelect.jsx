import React from 'react';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

const OptionSelect = ({ name, value, onChange, onBlur, data, placeholder, mode }) => {
  const handleChange = (selectedValues) => {
    console.log("name: ", name, "value: ", selectedValues);
    onChange({ target: { name, value: selectedValues } });
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur({ target: { name, value } });
    }
  };


  const optGroups = [];
  const options = [];

  data.forEach(item => {
    if (item.parentId === 0) {
      optGroups.push(item);
    } else {
      options.push(item);
    }
  });

  // Tìm và hiển thị tên của các mục đã chọn
  const selectedValuesWithNames = value.map(val => {
    const selectedItem = data.find(item => item.id === val.id);
    return selectedItem ? selectedItem.id : val;
  });

  console.log('selectedValuesWithNames:', selectedValuesWithNames);

  return (
    <Select
      mode={mode}
      style={{
        width: '100%',
        marginBottom: '4px',
        fontSize: 'small'
      }}
      value={selectedValuesWithNames}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      tokenSeparators={[',']}
      allowClear
    >
      {optGroups.map(optGroup => (
        <OptGroup key={optGroup.id} label={optGroup.name} style={{ fontSize: 'small' }}>
          {options.filter(option => option.parentId === optGroup.id).map(option => (
            <Option key={option.id} value={option.id} style={{ fontSize: 'small' }}>
              {option.name}
            </Option>
          ))}
        </OptGroup>
      ))}
    </Select>
  );
};

export default OptionSelect;
