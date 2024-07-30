import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import jwtDecode from 'jwt-decode';
import authApi from '../../api/authApi';
import { Button, Result } from 'antd';

const PaymentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState('');
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('access-token')) return (window.location.href = '/signin');
    authApi
      .getCourseById(courseId)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error('Error fetching course by id:', error);
      });
  }, [courseId]);

  useEffect(() => {
    if (!localStorage.getItem('access-token')) return (window.location.href = '/signin');
    const userString = localStorage.getItem('access-token');
    if (userString) {
      const decoded = jwtDecode(userString);
      setUser(decoded.userInfo[0]);
      authApi
        .getPaymentUser(decoded.sub)
        .then((response) => {
          console.log(response.data);
          const paymentArray = (response.data && response.data.listPayment) || [];
          setPayments(paymentArray);
        })
        .catch((error) => {
          console.error('Error fetching payments by username:', error);
        });
    }
  }, []);

  const handleEnroll = () => {
    if (!localStorage.getItem('access-token')) return (window.location.href = '/signin');

    const userString = localStorage.getItem('access-token');
    if (userString) {
      const params = {
        courseId: courseId,
        username: jwtDecode(userString).sub,
      };
      console.log(params);
      if (
        payments.filter((payment) => payment.courseName === course.name).length !== 0 ||
        jwtDecode(userString).userInfo[0] === 'ADMIN'
      ) {
        return navigate(`/view-course/${courseId}`);
      }
      authApi
        .enrollCourse(params)
        .then((response) => {
          const { orderId, urlPayment } = response.data;

          localStorage.setItem('paymentUrl', urlPayment);
          localStorage.setItem('orderID', orderId);
          window.location.replace(urlPayment);
        })
        .catch((error) => {
          console.error('Error enrolling course:', error);
        });
    } else return navigate('/signin');
  };

  return (
    <div>
      <Header />
      {payments.filter((payment) => payment.courseName === course.name).length !== 0 || user === 'ADMIN' ? (
        <>
          <Result
            title="You have already registered for this course"
            extra={
              <Button type="primary" key="console" onClick={() => (window.location.href = `/view-course/${courseId}`)}>
                Go to course
              </Button>
            }
          />
        </>
      ) : (
        <>
          <h2>Your order information</h2>
          <div className="course-details" style={{ marginTop: '50px', marginBottom: '150px' }}>
            <h2>Name Course: {course.name}</h2>
            <p style={{ color: '#000000e0', fontWeight: 'unset' }}>
              Price:{course.price && course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}VND
            </p>
          </div>
          <p>
            <button onClick={() => handleEnroll()}>Order Now</button>
          </p>
        </>
      )}

      <div style={{ position: 'fixed', bottom: '0', left: '0', zIndex: '1000', width: '100%', margin: '0' }}>
        <Footer />
      </div>
    </div>
  );
};

export default PaymentPage;
