import React from 'react';
import { Button } from 'react-bootstrap';

const IconButton = ({ icon, label }) => (
    <Button
        className="d-flex flex-column align-items-center"
        style={{
            background: 'none',
            border: 'none',
            fontSize: 'small',
            color: '#000'
        }}  
    >
        <i className={`bi ${icon}`} ></i>
        <span>{label}</span>
    </Button>
);

export default IconButton;
