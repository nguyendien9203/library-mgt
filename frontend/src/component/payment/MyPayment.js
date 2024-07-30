import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Table, Button } from 'antd';
import authApi from '../../api/authApi';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import moment from 'moment';

const MyPayment = () => {
  const [user, setUser] = useState('');
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('access-token')) return (window.location.href = '/signin');
    const userString = localStorage.getItem('access-token');
    if (userString) {
      var deCoded = jwt_decode(userString);
      setUser(deCoded.sub);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('access-token')) return (window.location.href = '/signin');

    if (user) {
      authApi
        .getPaymentUser(user)
        .then((response) => {
          console.log(response.data); // In ra dữ liệu trả về từ API
          const paymentArray = (response.data && response.data.listPayment) || [];
          const uniqueCourseNames = {};

          const filteredPayments = paymentArray.filter((payment) => {
            if (uniqueCourseNames[payment.courseName]) {
              return false;
            } else {
              uniqueCourseNames[payment.courseName] = true;
              return true;
            }
          });
          setPayments(filteredPayments);
        })
        .catch((error) => {
          console.error('Error fetching payments by username:', error);
        });
    }
  }, [user]);

  const columns = [
    {
      title: 'Created At',
      render: (record) => {
        const formatDate = moment(record.createdAt).format('MMMM Do YYYY, h:mm a');
        return <a>{formatDate}</a>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Amount',
      render: (record) => {
        return (
          <div>
            <a style={{ color: '#000000e0', fontWeight: 'unset' }}>
              {record.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}VND
            </a>
          </div>
        );
      },
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
  ];

  return (
    <div>
      <Header />
      <h1>My Payment</h1>
      <Table
        columns={columns}
        dataSource={payments}
        rowKey={(record) => record.id}
        style={{ paddingBottom: '150px' }}
      />
      <Footer />
    </div>
  );
};

export default MyPayment;
