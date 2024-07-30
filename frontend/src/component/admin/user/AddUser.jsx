import React, { useState } from 'react'
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'
import '../../../assets/style/Style.css'
import { useNavigate } from 'react-router-dom'
import Notification from '../../common/Notification'
import useNotification from '../../../hooks/useNotification'
import { addUser } from '../../../service/UserService'
import "../../../assets/style/User.css"

const AddUser = () => {
    const { showError } = useNotification();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "MEMBER",
        status: "ACTIVE"
    });

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [passwordConditions, setPasswordConditions] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateForm(name, value);
    }

    const validateForm= (name, value) => {
        let newErrors = { ...errors };
        let newPasswordConditions = { ...passwordConditions };
        let valid = true;

        const validateFullName = (fullName) => {
            const fullNamePattern = /^[a-zA-Z\s]*$/;
            if (!fullName) {
                return "Vui lòng nhập họ và tên";
            } else if (!fullNamePattern.test(fullName)) {
                return "Họ và tên chỉ chứa chữ cái và dấu cách";
            }
            return "";
        };

        const validateEmail = (email) => {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!email) {
                return "Vui lòng nhập email";
            } else if (!emailPattern.test(email)) {
                return "Email không hợp lệ";
            }
            return "";
        };

        const validatePhoneNumber = (phoneNumber) => {
            const phoneNumberPattern = /^(84|0[3|5|7|8|9])+([0-9]{8})$/;
            if (!phoneNumberPattern.test(phoneNumber)) {
                return "Số điện thoại không hợp lệ";
            }
            return "";
        }

        const validatePassword = (password) => {
            if (!password) {
                return "Vui lòng nhập mật khẩu";
            }
            newPasswordConditions.length = password.length >= 8;
            newPasswordConditions.uppercase = /[A-Z]/.test(password);
            newPasswordConditions.lowercase = /[a-z]/.test(password);
            newPasswordConditions.digit = /\d/.test(password);
            return "";
        };

        const validateConfirmPassword = (password, confirmPassword) => {
            if (!confirmPassword) {
                return "Vui lòng xác nhận mật khẩu";
            } else if (password !== confirmPassword) {
                return "Mật khẩu không khớp";
            }
            return "";
        };

        switch (name) {
            case "fullName":
                newErrors.fullName = validateFullName(value);
                if (newErrors.fullName) valid = false;
                break;
            case "email":
                newErrors.email = validateEmail(value);
                if (newErrors.email) valid = false;
                break;
            case "phoneNumber":
                newErrors.phoneNumber = validatePhoneNumber(value);
                if (newErrors.phoneNumber) valid = false;
                break;
            case "password":
                newErrors.password = validatePassword(value);
                setPasswordConditions(newPasswordConditions);
                if (newErrors.password) valid = false;
                break;
            case "confirmPassword":
                newErrors.confirmPassword = validateConfirmPassword(formData.password, value);
                if (newErrors.confirmPassword) valid = false;
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return valid;
    }

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateForm(name, value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm("fullName", formData.fullName) || !validateForm("email", formData.email) || !validateForm("password", formData.password) || !validateForm("confirmPassword", formData.confirmPassword) || !validateForm("phoneNumber", formData.phoneNumber)) {
            return;
        }

        if (!passwordConditions.length || !passwordConditions.uppercase || !passwordConditions.lowercase || !passwordConditions.digit) {    
            return;
        }

        setSubmitting(true);
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            await timer;
            const response = await addUser(formData);

            if (response.status === 201) {
                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    confirmPassword: "",
                    role: "MEMBER",
                    status: "ACTIVE"
                });

                navigate('/admin/user', { state: { success: response.message } });
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error("Error adding user:", error);
            showError('Có lỗi xảy ra khi thêm người dùng');
        } finally {
            setSubmitting(false);
        }

    }

    return (
        <div style={{ margin: '0 200px' }}>
            <Notification />
            <div style={{ marginBottom: '20px' }}>
                <h5 >Thêm người dùng</h5>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Label className="label">Họ và tên</Form.Label>
                    <Form.Control
                        className="field-input"
                        type="text"
                        placeholder="Nguyen Van A"
                        style={{ fontSize: "small", margin: '0' }}
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.fullName && <div className='text-danger'>{errors.fullName}</div>}
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label className="label">Email</Form.Label>
                    <Form.Control
                        className="field-input"
                        type="text"
                        placeholder="email@example.com"
                        style={{ fontSize: "small", margin: '0' }}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && <div className='text-danger'>{errors.email}</div>}
                </Form.Group>

                <Row className="mb-2">
                    <Form.Group as={Col}>
                        <Form.Label className="label">Số điện thoại</Form.Label>
                        <Form.Control
                            className="field-input"
                            type="text"
                            placeholder=""
                            style={{ fontSize: "small", margin: '0' }}
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.phoneNumber && <div className='text-danger'>{errors.phoneNumber}</div>}
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label className="label">Vai trò</Form.Label>
                        <Form.Select
                            className="field-input"
                            type="text"
                            placeholder=""
                            style={{ fontSize: "small", margin: '0' }}
                            name="role"
                            value={formData.role}
                            handleChange={handleChange}
                        >
                            <option
                                value="MEMBER"
                                style={{ fontSize: "small" }}
                            >
                                Thành viên
                            </option>
                            <option
                                value="LIBRARIAN"
                                style={{ fontSize: "small" }}
                            >
                                Thủ thư
                            </option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label className="label">Trạng thái</Form.Label>
                        <Form.Select
                            className="field-input"
                            type="text"
                            placeholder=""
                            style={{ fontSize: "small", margin: '0' }}
                            name="status"
                            value={formData.status}
                            handleChange={handleChange}
                        >
                            <option
                                value="ACTIVE"
                                style={{ fontSize: "small" }}
                            >
                                Đã kích hoạt
                            </option>
                            <option
                                value="INACTIVE"
                                style={{ fontSize: "small" }}
                            >
                                Chưa kích hoạt
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <hr style={{ border: '1px solid #DEE2E6', margin: '30px 0' }} />

                <Row className="mb-2">
                    <Form.Group as={Col}>
                        <Form.Group className="mb-2">
                            <Form.Label className="label">Mật khẩu</Form.Label>
                            <Form.Control
                                className="field-input"
                                type="password"
                                style={{ fontSize: "small", margin: '0' }}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && <div className='text-danger'>{errors.password}</div>}
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label className="label">Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                className="field-input"
                                type="password"
                                style={{ fontSize: "small", margin: '0' }}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.confirmPassword && <div className='text-danger'>{errors.confirmPassword}</div>}
                        </Form.Group>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-2">
                        <Form.Label className="label">Yêu cầu mật khẩu</Form.Label>
                        <p style={{ fontSize: "small" }}>Để tạo mật khẩu, bạn phải đáp ứng tất cả các yêu cầu sau:</p>
                        <ul style={{ fontSize: "small" }}>
                            <li className={`text ${passwordConditions.length ? "text-success" : "text-danger"}`}>Mật khẩu phải chứa ít nhất 8 ký tự</li>
                            <li className={`text ${passwordConditions.uppercase ? "text-success" : "text-danger"}`}>Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa</li>
                            <li className={`text ${passwordConditions.lowercase ? "text-success" : "text-danger"}`}>Mật khẩu phải chứa ít nhất 1 chữ cái viết thường</li>
                            <li className={`text ${passwordConditions.digit ? "text-success" : "text-danger"}`} c>Mật khẩu phải chứa ít nhất 1 số</li>
                        </ul>
                    </Form.Group>
                </Row>

                <Button
                    type="submit"
                    style={{
                        fontSize: 'small',
                        backgroundColor: '#F87555',
                        border: 'none'
                    }}
                    disabled={submitting}
                >
                    {submitting ? <Spinner animation="border" size="sm" /> : "Lưu thay đổi"}
                </Button>
            </Form>

        </div>
    )
}

export default AddUser