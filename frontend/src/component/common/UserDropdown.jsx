import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserDropdown = () => {
  const { isUserAuthenticated, logout, user } = useAuth();
  const authenticated = isUserAuthenticated();
  const getFullName = user ? user.fullName : '';
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm(
      "Bạn có chắc đăng xuất tài khoản người dùng này không?"
    );
    if (isLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <Nav>
      {!authenticated && <Link className="btnLogin" to="/login">Đăng nhập</Link>}

      {authenticated &&
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            style={{
              color: "#FFF",
              fontSize: "small",
              borderRadius: "50px",
              padding: "0px 10px",
              height: "35px",
              backgroundColor: "#f87555",
              border: "none",
            }}
          >
            {getFullName}
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              fontSize: "small",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              border: "1px solid #DEDEE1",
              color: "#000",
              backgroundColor: "#fff",
            }}
          >
            <Dropdown.Item as={Link} to="/profile" >Thông tin người dùng</Dropdown.Item>
            <Dropdown.Item href="#" onClick={handleLogout}>Đăng xuất</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
    </Nav>
  );
};

export default UserDropdown;
