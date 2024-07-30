import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import Logo from '../../assets/image/logo.png';
import '../../assets/style/ResetPassword.css';
import { Link, useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification.js";
import Notification from "../../component/common/Notification";
import { useAuth } from "../context/AuthContext.js";

const ResetPassword = () => {
  const { resetPassword, resend } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const [resendLoading, setResendLoading] = useState(false);
  const email = localStorage.getItem("email");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    otp: "",
    newPassword: "",
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

  const validateForm = (name, value) => {
    let newErrors = { ...errors };
    let newPasswordConditions = { ...passwordConditions };
    let valid = true;

    const validateOtp = (otp) => {
      const otpPattern = /^\d{6}$/;
      if (!otp) {
        return "Vui lòng nhập mã xác nhận";
      } else if (!otpPattern.test(otp)) {
        return "Mã xác nhận phải chứa 6 chữ số";
      }
      return "";
    };

    const validateNewPassword = (password) => {
      if (!password) {
        return "Vui lòng nhập mật khẩu mới";
      }
      newPasswordConditions.length = password.length >= 8;
      newPasswordConditions.uppercase = /[A-Z]/.test(password);
      newPasswordConditions.lowercase = /[a-z]/.test(password);
      newPasswordConditions.digit = /\d/.test(password);
      return "";
    };

    const validateConfirmPassword = (password, confirmPassword) => {
      if (!confirmPassword) {
        return "Vui lòng nhập lại mật khẩu mới";
      } else if (password !== confirmPassword) {
        return "Mật khẩu không khớp";
      }
      return "";
    };

    switch (name) {
      case "otp":
        newErrors.otp = validateOtp(value);
        if (newErrors.otp) valid = false;
        break;
      case "newPassword":
        newErrors.newPassword = validateNewPassword(value);
        setPasswordConditions(newPasswordConditions);
        if (newErrors.newPassword) valid = false;
        break;
      case "confirmPassword":
        newErrors.confirmPassword = validateConfirmPassword(formData.newPassword, value);
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
    const { otp, newPassword, confirmPassword } = formData;
    if (!validateForm("otp", otp) || !validateForm("newPassword", newPassword) || !validateForm("confirmPassword", confirmPassword)) {
      return;
    }

    if (!passwordConditions.length || !passwordConditions.uppercase || !passwordConditions.lowercase || !passwordConditions.digit) {
      return;
    }

    setSubmitting(true);
    const timer = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await timer;
      const response = await resetPassword(otp, email, newPassword);


      if (response.status === 200) {
        navigate("/login", { state: { message: response.message } });
      } else {
        showError(response.message);
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setResendLoading(true);

    try {
      const response = await resend(email);
      if (response.status === 200) {
        showSuccess(response.message);
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="reset-pw-container">
      <Notification />
      <div className="reset-pw">
        <div className="reset-pw-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="reset-pw-title">
          <h6>Thay đổi mật khẩu</h6>
          <div className="sub-title">
            Bạn chưa nhận được mã?
            <Link
              to="/verify"
              onClick={handleResendOtp}
              disabled={resendLoading}
              style={{ cursor: resendLoading ? "not-allowed" : "pointer" }}
            >
              {resendLoading ? "Đang gửi..." : "Gửi lại mã"}
            </Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label className="label">Mã xác nhận</Form.Label>
            <Form.Control
              className="field-input"
              type="number"
              length="6"
              placeholder="Nhập mã xác nhận"
              style={{ fontSize: "small", margin: '0' }}
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.otp && <div className="text-danger">{errors.otp}</div>}
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="label">Mật khẩu mới</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập mật khẩu mới"
              style={{ fontSize: "small", margin: "0" }}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.newPassword && <div className="text-danger">{errors.newPassword}</div>}
            {formData.newPassword && (
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
            <Form.Label className="label">Nhập lại mật khẩu mới</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              style={{ fontSize: "small", margin: '0' }}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
          </Form.Group>

          <Form.Group className="d-flex" style={{ marginTop: '150px' }}>
            <Button
              as={Link}
              to="/forgotpassword"
              className="btn-back-forgot"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #ABABAB',
                color: '#ABABAB',
                fontSize: 'small',
                marginRight: '10px'
              }}
            >
              Quay lại</Button>
            <Button
              className="btn-update-pw"
              type="submit"
              style={{
                backgroundColor: '#F87555',
                border: 'none',
                fontSize: 'small'
              }}
              disabled={submitting}

            >
              {submitting ? <Spinner animation="border" size="sm" /> : "Cập nhật mật khẩu"}
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
