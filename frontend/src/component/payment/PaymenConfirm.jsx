import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from './../../assets/image/Skateboarding.gif';
import useNotification from '../../hooks/useNotification';
import { useAuth } from '../context/AuthContext';
import { enrollMembership } from '../../service/MemberShipService';
const ResponseCode = {
  SUCCESS: 200,
  SEND_URL_PAYMENT_FAIL: 400,
};
const PaymentConfirm = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { showError, showSuccess } = useNotification();

  useEffect(() => {
    const memberId = searchParams.get('vnp_OrderInfo');
    const orderId = searchParams.get('vnp_TransactionNo');

    if (user) {
      const body = {
        email: user?.email,
        membershipId: parseInt(memberId),
        vnp_TransactionNo: parseInt(orderId),
      };

      enrollMembership(body)
        .then(resp => {
          switch (resp.code) {
            case ResponseCode.SEND_URL_PAYMENT_FAIL:
              setErrorMessage("Thanh toán không hợp lệ");
              showError("Thanh toán không hợp lệ");
              break;
            case ResponseCode.SUCCESS:
              showSuccess(resp.message);
              navigate('/', { state: { success: resp.message } });
              break;
            case ResponseCode.SUBSCRIPTION_EXIST:
              setErrorMessage("Người dùng đã mua gói thành viên");
              showError("Người dùng đã mua gói thành viên");
              break;
            case ResponseCode.FAIL:
            default:
              setErrorMessage("Có lỗi xảy ra khi thực hiện thanh toán");
              showError("Có lỗi xảy ra khi thực hiện thanh toán");
              break;
          }
        })
        .catch(error => {
          setErrorMessage("Có lỗi xảy ra khi thực hiện thanh toán");
          showError("Có lỗi xảy ra khi thực hiện thanh toán");
        });
    }
  }, [searchParams, user, navigate, showError, showSuccess]);

  const loadingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full height
  };

  const loadingImageStyle = {
    width: '100px', // Adjust the size as needed
    height: 'auto',
  };

  return (
    <div style={loadingContainerStyle}>
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <img src={logo} alt="Loading..." style={loadingImageStyle} />
      )}
    </div>
  );
}

export default PaymentConfirm;
