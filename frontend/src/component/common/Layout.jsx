import React from 'react';
import NavBar from '../common/NavBar';
import TopNav from '../common/TopNav';
import { Row, Col, Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Row style={{ height: '100%' }}>
        <Col className='col-2' style={{ position: 'sticky', top: 0, zIndex: 1000, height: '100vh', overflowY: 'hidden' }}>
          <NavBar />
        </Col>
        <Col className='col-10' style={{ position: 'relative', overflow: 'hidden' }}>
          <Container style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '0' }}>
            <TopNav />
          </Container>
          <div style={{ overflowY: 'auto', height: 'calc(100vh - 56px)', paddingRight: '15px', marginRight: '-15px', paddingBottom: '50px' }}>
            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Layout;
