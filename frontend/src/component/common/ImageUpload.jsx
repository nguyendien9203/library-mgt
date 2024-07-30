import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../assets/style/HandleHoverImage.css";

const ImageUpload = ({ label, name, onChange, onBlur, showError, defaultValue, error }) => {
    const [bookImagePreview, setBookImagePreview] = useState(null);
    const [hoverImage, setHoverImage] = useState(false);

    const bookImageInputRef = useRef(null);

    useEffect(() => {
        if (defaultValue) {
            setBookImagePreview(typeof defaultValue === 'string' ? defaultValue : URL.createObjectURL(defaultValue));
        }
    }, [defaultValue]);

    console.log('defaultValue:', defaultValue);

    const handleBlur = (e) => {
        onBlur(e);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                showError('Chỉ chấp nhận các định dạng: jpg, jpeg, png.');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                showError('Kích thước ảnh không được vượt quá 2MB.');
                return;
            }


            const reader = new FileReader();
            reader.onloadend = () => {
                setBookImagePreview(reader.result);

                console.log('name:', name, 'files:', file);
                onChange({ target: { name, files: file } });
            };
            reader.readAsDataURL(file);
        } else {
            setBookImagePreview(null);

            console.log('name:', name, 'files:', null);
            onChange({ target: { name, files: null } });
        }

    };

    const handleImageRemove = () => {
        setBookImagePreview(null);

        console.log('name:', name, 'files:', null);
        onChange({ target: { name, files: null } });

        const dataTransfer = new DataTransfer();
        bookImageInputRef.current.files = dataTransfer.files;

    };

    return (
        <Form.Group className="mb-2">
            {label && <Form.Label className="label">{label}</Form.Label>}
            <Form.Control
                className="field-input"
                type="file"
                style={{ fontSize: "small", margin: '0' }}
                name={name}
                ref={bookImageInputRef}
                onChange={handleImageChange}
                onBlur={handleBlur}
            />
            {error && <div className="text-danger">{error}</div>}
            <div
                className="image-container"
                onMouseEnter={() => setHoverImage(true)}
                onMouseLeave={() => setHoverImage(false)}
                style={{ display: bookImagePreview ? 'flex' : 'none' }}
            >
                {bookImagePreview && (
                    <img
                        src={bookImagePreview}
                        alt="Book Preview"
                        style={{
                            maxWidth: '100px',
                            height: 'auto',
                            opacity: hoverImage ? 0.3 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                )}
                {bookImagePreview && (
                    <Button
                        variant='none'
                        onClick={handleImageRemove}
                        className="remove-image-button"
                    >
                        <i className="bi bi-trash3"></i>
                    </Button>
                )}
            </div>
        </Form.Group>
    );
};

export default ImageUpload;
