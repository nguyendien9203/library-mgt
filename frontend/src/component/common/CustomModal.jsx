import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, title, children, handleSave, size, submitting, hasFooter }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size={size}
            style={{
                fontSize: 'small'
            }}
        >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {children}

                </Modal.Body>

                {hasFooter && (

                    <Modal.Footer>
                        <Button
                            style={{
                                fontSize: 'small',
                                backgroundColor: 'transparent',
                                color: '#4D4D4D',
                                border: '1px solid #ABABAB',
                                marginLeft: '10px'
                            }}
                            onClick={handleClose}
                        >
                            Thoát
                        </Button>
                        <Button
                            type="submit"
                            style={{
                                fontSize: 'small',
                                backgroundColor: '#F87555',
                                border: 'none'
                            }}
                            disabled={submitting}
                            onClick={handleSave}
                        >
                            {submitting ? <Spinner animation="border" size="sm" /> : "Lưu thay đổi"}
                        </Button>
                    </Modal.Footer>
                )}
            </Form>

        </Modal >
    );
};

export default CustomModal;
