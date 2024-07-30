import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import Logo from '../../assets/image/logo.png';
import { useAuth } from '../context/AuthContext.js';
import { Link } from 'react-router-dom';


const NavBar = () => {

  const { isUserAuthenticated, isMember, isAdmin, isLibrarian } = useAuth();
  const [authenticated, setAuthenticated] = useState(isUserAuthenticated());
  const [member, setMember] = useState(isMember);
  const [admin, setAdmin] = useState(isAdmin);
  const [librarian, setLibrarian] = useState(isLibrarian);

  useEffect(() => {
    setAuthenticated(isUserAuthenticated());
    setMember(isMember);
    setAdmin(isAdmin);
    setLibrarian(isLibrarian);
  }, [isUserAuthenticated, isMember, isAdmin, isLibrarian]);

  return (

    <Nav defaultActiveKey="/" className="flex-column bg-white d-flex align-items-center"
      style={{
        height: "100vh",
        boxShadow: "10px 0 10px -10px rgba(0, 0, 0, 0.1), -10px 0 10px -10px rgba(0, 0, 0, 0.1)"
      }}

    >
      <div className="d-flex flex-column flex-grow-1 justify-content-between">
        <div>
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              <img src={Logo} alt="logo" style={{ width: '120px', height: '74.18px', marginBottom: '50px' }} />
            </Nav.Link>
          </Nav.Item>

          {(!authenticated || member) && (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/" className="nav-link" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                  <i className="bi bi-house"></i>
                  <span className='mx-2'>Trang chủ</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/search" className="nav-link" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                  <i className="bi bi-search"></i>
                  <span className='mx-2'>Tìm kiếm</span>
                </Nav.Link>
              </Nav.Item>
            </>
          )}

          {member && (
            <>
              <Nav.Item>
                <Nav.Link as={Link} to="/my-shelf" className="nav-link" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                  <i className="bi bi-menu-button-wide"></i>
                  <span className='mx-2'>Sách của tôi</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/contribute" className="nav-link" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                  <i className="bi bi-people"></i>
                  <span className='mx-2'>Gói thành viên</span>
                </Nav.Link>
              </Nav.Item>
            </>
          )}


          {(librarian || admin) &&
            <Nav.Item>
              <Nav.Link as={Link} to="/admin" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <i className="bi bi-columns-gap"></i>
                <span className='mx-1'>Bảng điều khiển</span>
              </Nav.Link>
            </Nav.Item>
          }

          {admin &&
            <Nav.Item>
              <Nav.Link as={Link} to="/admin/user" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <i className="bi bi-person"></i>
                <span className='mx-1'>Người dùng</span>
              </Nav.Link>
            </Nav.Item>
          }

          {librarian &&
            <Nav.Item>
              <Nav.Link as={Link} to="/admin/book" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <i className="bi bi-book"></i>
                <span className='mx-1'>Sách</span>
              </Nav.Link>
            </Nav.Item>
          }

          {librarian && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/admin/category"
                style={{ color: '#8A8A8A', fontSize: 'small' }}
              >
                <i class="bi bi-card-text"></i>
                <span className="mx-1">Danh mục</span>
              </Nav.Link>
            </Nav.Item>
          )}

          {librarian && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/admin/author"
                style={{ color: '#8A8A8A', fontSize: 'small' }}
              >
                <i className="bi bi-person-vcard"></i>
                <span className="mx-1">Tác giả</span>
              </Nav.Link>
            </Nav.Item>
          )}

          {librarian && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/admin/rent"
                style={{ color: '#8A8A8A', fontSize: 'small' }}
              >
                <i className="bi bi-check-circle"></i>
                <span className="mx-1">D.sách cho thuê</span>
              </Nav.Link>
            </Nav.Item>
          )}
          {librarian && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/admin/book/return"
                style={{ color: '#8A8A8A', fontSize: 'small' }}
              >
                <i className="bi bi-arrow-return-left"></i>
                <span className="mx-1">D.sách trả sách</span>
              </Nav.Link>
            </Nav.Item>
          )}
          {librarian && (
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/admin/membership"
                style={{ color: '#8A8A8A', fontSize: 'small' }}
              >
                <i className="bi bi-people"></i>
                <span className="mx-1">Gói Thành viên</span>
              </Nav.Link>
            </Nav.Item>
          )}

        </div>

        {(!authenticated || member) && (
          <div style={{ marginBottom: '20px' }}>
            <Nav.Item>
              <Nav.Link as={Link} to="/about-us" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <span className='mx-2'>Về chúng tôi</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/support" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <span className='mx-2'>Hỗ trợ</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/terms-of-service" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <span className='mx-2'>Điều khoản dịch vụ</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link as={Link} to="/privacy-policy" style={{ color: '#8A8A8A', fontSize: 'small' }}>
                <span className='mx-2'>Chính sách bảo mật</span>
              </Nav.Link>
            </Nav.Item>
          </div>
        )}
      </div>
    </Nav>

  );
}

export default NavBar;
