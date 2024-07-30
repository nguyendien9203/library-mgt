import React from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Result } from 'antd';
import authApi from '../../api/authApi';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const PaymentVnPaySuccess = () => {
  const [id, setId] = useState(localStorage.getItem('orderID'));
  const [search] = useSearchParams();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('access-token')) return (window.location.href = '/signin');
    const vnp_Amount = search.get('vnp_Amount');
    const vnp_BankCode = search.get('vnp_BankCode');
    const vnp_BankTranNo = search.get('vnp_BankTranNo');
    const vnp_CardType = search.get('vnp_CardType');
    const vnp_OrderInfo = search.get('vnp_OrderInfo');
    const vnp_PayDate = search.get('vnp_PayDate');
    const vnp_ResponseCode = search.get('vnp_ResponseCode');
    const vnp_TmnCode = search.get('vnp_TmnCode');
    const vnp_TransactionNo = search.get('vnp_TransactionNo');
    const vnp_TransactionStatus = search.get('vnp_TransactionStatus');
    const vnp_TxnRef = search.get('vnp_TxnRef');
    const vnp_SecureHash = search.get('vnp_SecureHash');

    if (id) {
      const params = {
        orderId: id,
        vnp_Amount: vnp_Amount,
        vnp_BankCode: vnp_BankCode,
        vnp_BankTranNo: vnp_BankTranNo,
        vnp_CardType: vnp_CardType,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_PayDate: vnp_PayDate,
        vnp_ResponseCode: vnp_ResponseCode,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TransactionNo: vnp_TransactionNo,
        vnp_TransactionStatus: vnp_TransactionStatus,
        vnp_TxnRef: vnp_TxnRef,
        vnp_SecureHash: vnp_SecureHash,
      };
      console.log('Lap lai');
      authApi
        .confirmPayment(params)
        .then((res) => {
          if (vnp_ResponseCode === '00') {
            setShowMessage(true);
          } else {
          }
        })
        .catch((error) => {
          setShowMessage(false);
          console.error(error);
        });
    } else {
      console.log('Không tìm thấy orderId');
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className="payment-container">
        {showMessage ? (
          <Result
            status="success"
            title="Congratulations, you have successfully paid for the course!"
            style={{ paddingBottom: '300px' }}
            extra={[
              <Button type="primary" key="console" onClick={() => (window.location.href = '/myPayment')}>
                Go to my payment
              </Button>,
            ]}
          />
        ) : (
          <Result
            status="error"
            title="Course payment failed, Please try again!!"
            style={{ paddingBottom: '300px' }}
            extra={
              [
                // <Button type="primary" key="console" onClick={() => (window.location.href = '')}>
                //   Try Again
                // </Button>,
              ]
            }
          ></Result>
        )}
      </div>

      <Footer />
    </>
  );
};

export default PaymentVnPaySuccess;
