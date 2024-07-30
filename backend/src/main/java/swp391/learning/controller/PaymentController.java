package swp391.learning.controller;

import lombok.AllArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import swp391.learning.application.service.Implements.PaymentImpl;
import swp391.learning.domain.dto.common.PaymentRes;
import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.payment.GetPaymentByUserRequest;
import swp391.learning.domain.dto.response.user.payment.ResponsePayment;
import swp391.learning.domain.enums.ResponseCode;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {
    private final PaymentImpl paymentService;

    @GetMapping("/get-payment-url")
    public ResponseEntity<ResponseCommon<PaymentRes>> getPaymentUrl(@RequestParam(name = "amount") double amount, @RequestParam(name = "memberId") int memberId) {
        ResponseCommon<PaymentRes> response = paymentService.addPayment(amount, memberId);

        if (response.getCode() == ResponseCode.SUCCESS.getCode()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(new ResponseCommon<>(ResponseCode.FAIL.getCode(), "Get payment failed", null));
        }
    }


}