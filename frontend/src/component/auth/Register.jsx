import React, { useState } from "react";
import { Form, Button, FormCheck, Spinner } from "react-bootstrap";
import "../../assets/style/Register.css";
import Logo from "../../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import Notification from "../../component/common/Notification";
import useNotification from "../../hooks/useNotification.js";

const Register = () => {
  const { register, sendOtp } = useAuth();
  const { showError, showSuccess } = useNotification();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false
  });

  const [agreePolicy, setAgreePolicy] = useState(false);

  const navigate = useNavigate();
  const send = async () => {
    try {
      const response = await sendOtp(formData.email);
      if (response.status === 200) {
        showSuccess(response.message);
      }
    } catch (error) {
      showError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm(name, value);
  };

  const validateForm = (name, value) => {
    let newErrors = { ...errors };
    let newPasswordConditions = { ...passwordConditions };
    let valid = true;

    const validateFullName = (fullName) => {
      const fullNamePattern = /^[a-zA-Z\s]*$/;
      if (!fullName) {
        return "Vui lòng nhập họ và tên";
      } else if (!fullNamePattern.test(fullName)) {
        return "Họ và tên chỉ chứa chữ cái và khoảng trắng";
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
  };


  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateForm(name, value);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm("fullName", formData.fullName) || !validateForm("email", formData.email) || !validateForm("password", formData.password) || !validateForm("confirmPassword", formData.confirmPassword)) {
      return;
    }

    if (!passwordConditions.length || !passwordConditions.uppercase || !passwordConditions.lowercase || !passwordConditions.digit) {
      return;
    }

    if (!agreePolicy) {
      return;
    }

    setSubmitting(true);
    const timer = new Promise((resolve) => setTimeout(resolve, 2000));


    try {
      await timer;
      const response = await register(formData);
      if (response.status === 201) {
        send();
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        navigate("/verify");
      }
    } catch (error) {
      showError(error.message);
    } finally { 
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <Notification />
      <div className="register">
        <div className="register-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="register-title">
          <h6>Đăng ký tài khoản</h6>
          <div className="sub-title">
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label className="label">Họ và tên</Form.Label>
            <Form.Control
              className="field-input"
              type="text"
              placeholder="Nhập họ và tên"
              style={{ fontSize: "small", margin: '0' }}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.fullName && <div className="text-danger">{errors.fullName}</div>}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="field-input"
              type="email"
              placeholder="Nhập email"
              name="email"
              style={{ fontSize: "small", margin: "0" }}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="label">Mật khẩu</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập mật khẩu"
              style={{ fontSize: "small", margin: "0" }}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
            {formData.password && (
              <div className="password-conditions d-flex flex-column">
                <div className={`text ${passwordConditions.length ? "text-success" : "text-danger"}`}>
                  Mật khẩu phải chứa ít nhất 8 ký tự
                </div>
                <div className={`text ${passwordConditions.uppercase ? "text-success" : "text-danger"}`}>
                  Mật khẩu phải chứa ít nhất 1 chữ cái viết hoa
                </div>
                <div className={`text ${passwordConditions.lowercase ? "text-success" : "text-danger"}`}>
                  Mật khẩu phải chứa ít nhất 1 chữ cái viết thường
                </div>
                <div className={`text ${passwordConditions.digit ? "text-success" : "text-danger"}`}>
                  Mật khẩu phải chứa ít nhất 1 số
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label className="label">Xác nhận mật khẩu</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập lại mật khẩu"
              name="confirmPassword"
              style={{ fontSize: "small", margin: "0" }}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
          </Form.Group>
          <Form.Group className="mb-4">
            <FormCheck
              type="checkbox"
              className="mb-2"
              style={{
                fontSize: "small",
                color: "#000"
              }}
              label={
                <>
                  Tôi đã đọc và đồng ý với{" "}
                  <Link to="/terms-of-service" style={{color: '#F87555', fontSize: 'samll'}}>Điều khoản dịch vụ</Link> và{" "}
                  <Link to="/privacy-policy" style={{color: '#F87555', fontSize: 'small'}}>Chính sách bảo mật</Link> của My Book Shelf
                </>
              }
              onChange={(e) => setAgreePolicy(e.target.checked)}
              checked={agreePolicy}
            />

          </Form.Group>
          <Form.Group>
            <Button
              className="btn-register"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small"
              }}
              disabled={submitting}
            >
              {submitting ? <Spinner animation="border" size="sm" /> : "Đăng ký"}
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;
