import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import Logo from '../../assets/image/logo.png';
import '../../assets/style/ForgotPassword.css';
import { Link, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification.js";
import Notification from "../../component/common/Notification";
import { useAuth } from "../context/AuthContext.js";

const ForgotPassword = () => {
  const { forgotPassword, sendOtp } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: ""
  });

  const [errors, setErrors] = useState({
    email: ""
  });

  // xử lý send otp
  const send = async () => {
    try {
      const response = await sendOtp(formData.email);
      console.log("response", response);
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
    let valid = true;

    const validateEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email) {
        return "Vui lòng nhập email";
      } else if (!emailPattern.test(email)) {
        return "Email không hợp lệ";
      }
      return "";
    };

    if (name === "email") {
      newErrors.email = validateEmail(value);
      if (newErrors.email) {
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateForm(name, value);
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm("email", formData.email)) {
      return;
    }

    setSubmitting(true);
    const timer = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await timer;
      const response = await forgotPassword(formData.email);

      if (response.status === 200) {
        send();
        navigate("/resetpassword");
      } else {
        showError(response.message);
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setSubmitting(false);
    }

  };

  return (
    <div className="forgot-pw-container">
      <Notification />
      <div className="forgot-pw">
        <div className="forgot-pw-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="forgot-pw-title">
          <h6>Quên mật khẩu</h6>
          <div className="sub-title">
            Vui lòng nhập email đăng ký của bạn
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="field-input"
              type="text"
              placeholder="Nhập email"
              style={{ fontSize: "small", margin: '0' }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </Form.Group>

          <Form.Group className="d-flex" style={{marginTop: '150px'}}>
            <Button
              as={Link}
              to="/login"
              className="btn-back-login"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #ABABAB',
                color: '#ABABAB',
                fontSize: 'small',
                marginRight: '10px'
              }}
            >
              <span>Quay lại</span>
            </Button>
            <Button
              className="btn-create-pw"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
              disabled={submitting}
            >
              {submitting ? <Spinner animation="border" size="sm" /> : "Tạo lại mật khẩu"}
            </Button>
          </Form.Group>
        </Form>


      </div>
    </div>
  );
};

export default ForgotPassword;