import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'
import '../../../assets/style/Style.css'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserById, updateUser } from '../../../service/UserService'
import useNotification from '../../../hooks/useNotification'
import Notification from '../../common/Notification'
import "../../../assets/style/User.css"
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
    const { showError, showSuccess } = useNotification();
    const [submitting, setSubmitting] = useState(false);
    const [profile, setProfile] = useState({});

    const { user } = useAuth();

    console.log("User:", user);

    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordConditions, setPasswordConditions] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserById(user.id);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordData({ ...passwordData, [name]: value });
        } else {
            setProfile({ ...profile, [name]: value });
        }
        validateForm(name, value);
    }

    const validateForm = (name, value) => {
        let newErrors = { ...errors };
        let newPasswordConditions = { ...passwordConditions };
        let valid = true;

        const validateFullName = (fullName) => {
            if (!fullName) {
                return "Vui lòng nhập họ và tên";
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
            newPasswordConditions.length = password.length >= 8;
            newPasswordConditions.uppercase = /[A-Z]/.test(password);
            newPasswordConditions.lowercase = /[a-z]/.test(password);
            newPasswordConditions.digit = /\d/.test(password);
        };

        const validateConfirmPassword = (password, confirmPassword) => {
            if (!confirmPassword) {
                return password ? "Vui lòng xác nhận mật khẩu" : "";
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
                if (passwordData.confirmPassword) {
                    newErrors.confirmPassword = validateConfirmPassword(value, passwordData.confirmPassword);
                    if (newErrors.confirmPassword) valid = false;
                }
                if (newErrors.password) valid = false;
                break;
            case "confirmPassword":
                newErrors.confirmPassword = validateConfirmPassword(passwordData.password, value);
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
    
        let isFormValid = validateForm('fullName', profile.fullName) &&
                          validateForm('email', profile.email) &&
                          validateForm('phoneNumber', profile.phoneNumber);
    
        if (passwordData.password || passwordData.confirmPassword) {
            if (!passwordData.password || !passwordData.confirmPassword) {
                if (!passwordData.password) {
                    setErrors(prevErrors => ({ ...prevErrors, password: "Vui lòng nhập mật khẩu" }));
                }
                if (!passwordData.confirmPassword) {
                    setErrors(prevErrors => ({ ...prevErrors, confirmPassword: "Vui lòng xác nhận mật khẩu" }));
                }
                isFormValid = false;
            } else {
                isFormValid = validateForm('password', passwordData.password) &&
                              validateForm('confirmPassword', passwordData.confirmPassword) &&
                              passwordConditions.length &&
                              passwordConditions.uppercase &&
                              passwordConditions.lowercase &&
                              passwordConditions.digit;
            }
        }
    
        if (!isFormValid) {
            return;
        }
    
        setSubmitting(true);
        const timer = new Promise((resolve) => setTimeout(resolve, 2000));
    
        try {
            const updatedUser = { ...profile };
            if (passwordData.password && passwordData.confirmPassword) {
                updatedUser.password = passwordData.password;
            }
    
            await timer;
            const response = await updateUser(user.id, updatedUser);
            if (response.status === 200) {
                showSuccess('Cập nhật thành công');
            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            showError('Có lỗi xảy ra, vui lòng thử lại sau');
        } finally {
            setSubmitting(false);
        }
    };

    console.log("Profile:", profile);

    return (
        <div style={{ margin: '0 200px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h5 >Cập nhật người dùng</h5>
            </div>
            <Notification />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="label">Họ và tên</Form.Label>
                    <Form.Control
                        className="field-input"
                        type="text"
                        placeholder="Nguyen Van A"
                        style={{ fontSize: "small", margin: '0' }}
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.fullName && <div className='text-danger'>{errors.fullName}</div>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="label">Email</Form.Label>
                    <Form.Control
                        className="field-input"
                        type="text"
                        placeholder="email@example.com"
                        style={{ fontSize: "small", margin: '0' }}
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && <div className='text-danger'>{errors.email}</div>}
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="label">Số điện thoại</Form.Label>
                        <Form.Control
                            className="field-input"
                            type="text"
                            placeholder=""
                            style={{ fontSize: "small", margin: '0' }}
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.phoneNumber && <div className='text-danger'>{errors.phoneNumber}</div>}
                    </Form.Group>
                </Row>
                <hr style={{ border: '1px solid #DEE2E6', marginBottom: '30px' }} />

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Group className="mb-3">
                            <Form.Label className="label">Mật khẩu</Form.Label>
                            <Form.Control
                                className="field-input"
                                type="password"
                                style={{ fontSize: "small", margin: '0' }}
                                name="password"
                                value={passwordData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && <div className='text-danger'>{errors.password}</div>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="label">Xác nhận mật khẩu</Form.Label>
                            <Form.Control
                                className="field-input"
                                type="password"
                                style={{ fontSize: "small", margin: '0' }}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
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

export default Profile