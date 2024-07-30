import React from 'react';
import { Form } from 'react-bootstrap';
import "../../assets/style/Style.css";

const Textarea = ({ label, name, value, onChange, placeholder, rows }) => {

  const handleChange = (e) => {
    console.log('name:', name, 'value:', e.target.value);
    onChange(e);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="label">{label}</Form.Label>
      <Form.Control
        as="textarea"
        rows={rows}
        className="field-input"
        placeholder={placeholder}
        style={{
          fontSize: "small",
          height: "70px"
        }}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </Form.Group>
  );
};

export default Textarea;
