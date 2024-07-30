import React, { useState, useRef } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import useNotification from '../../../hooks/useNotification';

const FileInput = ({ label, name, accept, multiple, onChange, files, onRemove, previewImages }) => {
  const { showError } = useNotification();
  const fileInputRef = useRef(null);
  const [hoverImage, setHoverImage] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (accept && !accept.includes(file.type)) {
        showError(`Chỉ chấp nhận các định dạng ${accept.join(', ')}.`);
        return;
      }
      onChange(e);
    }
  };

  const handleRemove = (index) => {
    onRemove(index);
    const dataTransfer = new DataTransfer();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    newFiles.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="label">{label}</Form.Label>
      <Form.Control
        className="field-input"
        type="file"
        accept={accept ? accept.join(', ') : undefined}
        multiple={multiple}
        style={{ fontSize: "small" }}
        name={name}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {previewImages && previewImages.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <ListGroup>
            {previewImages.map((file, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ fontSize: 'small' }}>
                <span>{file.name}</span>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(index)}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000'
                  }}
                >
                  <i className="bi bi-trash3"></i>
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </Form.Group>
  );
};

export default FileInput;
