import React, { useEffect, useState } from 'react'
import { getMemberships, checkUserSubscribed } from '../../../service/MemberShipService.js';
import useNotification from '../../../hooks/useNotification.js';
import Notification from '../../common/Notification.jsx';
import database from '../../../database.json'
import './Contribute.css'
import { getPaymentUrl } from '../../../service/PaymentService.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { Button, Row, Col, Card } from 'react-bootstrap';

const Contribute = () => {
  const [data, setData] = useState([])
  const { showError, showSuccess, showInfo } = useNotification();
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (location.state && location.state.success) {
      showInfo(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showInfo, navigate]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("user", user);

  const fetchData = async () => {
    try {
      const res = await getMemberships();

      console.log("res", res);
      if (res?.code === 200) {
        const memberships = await Promise.all(res?.data.map(async mem => {
          const isSubscribedRes = await checkUserSubscribed(user.id, mem.id);
          const isSubscribed = isSubscribedRes?.data || false;
          return { ...mem, isSubscribed };
        }));
        setData(memberships);
      } else {
        showError(res.message);
      }
    } catch (err) {
      showError('Lỗi khi lấy dữ liệu gói thành viên');
    }
  };

  console.log("data", data);

  const mergeMembershipWithBenefits = (memberships, benefitsData) => {
    // Iterate through membership data and add benefits to each membership
    memberships.forEach(membership => {
      const matchingBenefits = benefitsData.membership_benefits.find(item => item.membershipId === membership.id);
      if (matchingBenefits) {
        membership.benefits = matchingBenefits.benefitIds.map(benefitId => {
          const benefit = benefitsData.benefits.find(b => b.id === benefitId);
          return { id: benefit.id, name: benefit.name };
        });
      } else {
        membership.benefits = [];
      }
    });

    return memberships;
  }

  const handleOnClick = async (id, amount, isSubscribed) => {
    if (isSubscribed) {
      showInfo('Bạn đã đăng ký gói thành viên này.');
      return;
    }

    const alreadySubscribed = data.some((mem) => mem.isSubscribed);
    if (alreadySubscribed) {
      showInfo('Bạn đã đăng ký một gói thành viên khác.');
      return;
    }

    await getPaymentUrl(id, amount)
      .then((res) => {
        if (res?.code === 200) {
          window.location.href = res?.data?.url;
        }
      })
      .catch((error) => console.log(error));
  };


  return (
    <div>
      <Notification />
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
        <h5>Các gói thành viên</h5>
      </div>

      {data?.length > 0 ? (
        <Row className="justify-content-start">
          {data.map((mem) => (
            <Col key={mem.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card
                className={`d-flex flex-colum ${mem.isSubscribed ? 'subscribed' : ''}`}
                style={{
                  fontSize: 'small',
                  width: '100%',
                  border: 'none',
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  position: 'relative'
                }}
              >
                <Card.Body className="">
                  <Card.Title>{mem.nameSubscription}</Card.Title>
                  <Card.Subtitle className='my-4 text-muted' style={{ fontSize: '2rem' }}>{mem.feeMember} VND</Card.Subtitle>
                  <hr style={{ width: '100%', margin: '10px 0' }} />
                  <Card.Text className='my-3'>
                    <ul className="benefits-list">
                      {mem.benefits.map((b, idx) => (
                        <li key={idx} style={{ fontSize: 'x-small' }}>
                          <i className="bi bi-check2"></i> {b.name}
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                  <Button
                    onClick={() => handleOnClick(mem.id, mem.feeMember, mem.isSubscribed)}
                    disabled={mem.isSubscribed}
                    style={{
                      backgroundColor: mem.isSubscribed ? '#6c757d' : '#F87555',
                      width: '100%',
                      color: '#fff',
                      fontSize: 'small',
                      borderRadius: '5px',
                      height: '32px',
                      border: 'none',
                      cursor: mem.isSubscribed ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {mem.isSubscribed ? 'Đã mua' : 'Mua gói'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="mt-4">Không có gói thành viên nào được tìm thấy</p>
      )}
    </div>
  );
}

export default Contribute