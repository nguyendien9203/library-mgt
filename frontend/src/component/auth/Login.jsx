
import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import "../../assets/style/Login.css";
import Logo from "../../assets/image/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useNotification from "../../hooks/useNotification.js";
import Notification from "../../component/common/Notification";
import { useAuth } from "../context/AuthContext.js";


const Login = () => {
  const { login, sendOtp, isAdmin, isLibrarian, isMember } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      showSuccess(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showSuccess, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  // xử lý send otp
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

    const validatePassword = (password) => {
      if (!password) {
        return "Vui lòng nhập mật khẩu";
      }
      return "";
    };

    switch (name) {
      case "email":
        newErrors.email = validateEmail(value);
        if (newErrors.email) valid = false;
        break;
      case "password":
        newErrors.password = validatePassword(value);
        if (newErrors.password) valid = false;
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
    if (!validateForm("email", formData.email) || !validateForm("password", formData.password)) {
      return;
    }

    setSubmitting(true);
    const timer = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await timer;
      const response = await login(formData);
      if (response.status === 200) {

        if (isAdmin()) {
          navigate("/admin");
        } else if (isLibrarian()) {

          navigate("/admin");
        } else if (isMember()) {
          navigate("/");
        } else {
          showError('Không thể xác định vai trò của người dùng');
        }
      } else if (response.status === 302) {
        send();
        navigate("/verify");
      } else {
        showError(response.message);
      }
    } catch (error) {
      showError(error.message);
    } finally {
      setSubmitting(false);
    }

  };

  // const handleGoogleLoginSuccess = async (response) => {
  //   try {
  //     const { credential } = response;
  //     const googleUser = await oAuth2Login(credential);
  //     if (googleUser.status === 200) {
  //       if (isMember()) {
  //         navigate("/");
  //       } else {
  //         navigate("/admin");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error logging in with Google:", error);
  //     showError(error.message);
  //   }
  // };

  // const handleGoogleLoginFailure = (error) => {
  //   console.error("Google login failed:", error);
  //   showError('Google login failed');
  // };

  // const handleLogin = () => {
  //   window.location.href = 'http://localhost:8080/login/oauth2/code/google';
  // };



  return (
    <div className="login-container">
      <Notification />
      <div className="login">
        <div className="login-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="login-title">
          <h6>Đăng nhập</h6>
          <div className="sub-title">
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              className="field-input"
              type="email"
              placeholder="Nhập email"
              style={{ fontSize: "small", margin: '0' }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label className="label">Mật khẩu</Form.Label>
            <Form.Control
              className="field-input"
              type="password"
              placeholder="Nhập mật khẩu"
              style={{ fontSize: "small", margin: '0' }}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </Form.Group>
          <div className="forgot-password">
            <Link to="/forgotpassword">Quên mật khẩu?</Link>
          </div>
          <Form.Group style={{marginTop: '150px'}}>
            <Button
              className="btn-login"
              type="submit"
              style={{
                backgroundColor: "#F87555",
                border: "none",
                fontSize: "small",
              }}
              disabled={submitting}
            >
              {submitting ? <Spinner animation="border" size="sm" /> : "Đăng nhập"}
            </Button>
          </Form.Group>
        </Form>
        {/* <div className="or">Hoặc đăng nhập bằng</div>
        <div className="d-flex justify-content-center align-items-center">
          <Link onClick={handleLogin} className="btn-login-google">
            <i className="bi bi-google"></i>
          </Link>
        </div> */}


      </div>
    </div>
  );
}

export default Login;
