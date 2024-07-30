package swp391.learning.application.service;

import swp391.learning.domain.dto.common.PaymentRes;
import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.payment.GetPaymentByUserRequest;
import swp391.learning.domain.dto.response.user.payment.ResponsePayment;

import java.io.UnsupportedEncodingException;

public interface PaymentService {

    ResponseCommon<PaymentRes> addPayment(double amount, int memberId) throws UnsupportedEncodingException;
}

