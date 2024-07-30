import React from 'react';
import { Form } from 'react-bootstrap';
import "../../assets/style/Style.css";

const TextInput = ({ label, name, value, onChange, onBlur, type, placeholder, readOnly, error }) => {
  const handleChange = (e) => {
    console.log('name:', name, 'value:', e.target.value);
    onChange(e);
  };

  const handleBlur = (e) => {
    onBlur(e);
  };

  return (
    <Form.Group className="mb-2">
      <Form.Label className="label">{label}</Form.Label>
      <Form.Control
        className="field-input"
        type={type}
        placeholder={placeholder}
        style={{ fontSize: "small", margin: '0' }}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur ? handleBlur : ''}
        readOnly={readOnly}
      />
      {error && <div className="text-danger">{error}</div>}
    </Form.Group>
  );
};

export default TextInput;
