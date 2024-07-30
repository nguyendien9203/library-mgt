import React from 'react';
import { Form } from 'react-bootstrap';
import "../../assets/style/Style.css";

const SelectInput = ({ label, name, value, onChange, placeholder, data }) => {
    const handleChange = (e) => {
        console.log('name:', name, 'value:', e.target.value);
        onChange(e);
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="select"
                name={name}
                value={value}
                onChange={handleChange}
                defaultValue={data[0].value}
                className="field-input"
                style={{ fontSize: 'small' }}
                placeholder={placeholder}
            >
                {data && data.map(option => (
                    <option key={option.value} value={option.value} style={{fontSize: 'small'}}>
                        {option.name}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default SelectInput;
