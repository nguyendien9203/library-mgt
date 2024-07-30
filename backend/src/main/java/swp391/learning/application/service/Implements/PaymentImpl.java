package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.PaymentService;
import swp391.learning.config.VnPayConfig;
import swp391.learning.domain.dto.common.PaymentRes;
import swp391.learning.domain.dto.common.ResponseCommon;
import swp391.learning.domain.dto.request.user.payment.GetPaymentByUserRequest;
import swp391.learning.domain.dto.response.user.payment.GetPaymentByUserResponse;
import swp391.learning.domain.dto.response.user.payment.ResponsePayment;
import swp391.learning.domain.entity.Payment;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.ResponseCode;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentImpl implements PaymentService {
    @Override
    public ResponseCommon<PaymentRes> addPayment(double amount, int memberId) {

        String vnp_TxnRef = VnPayConfig.getRandomNumber(8);
        String vnp_TmnCode = VnPayConfig.vnp_TmnCode;
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        Long lastAmount = (long) (100L * amount);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Amount", String.valueOf(lastAmount));
        vnp_Params.put("vnp_Command", VnPayConfig.vnp_Command);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_OrderInfo", "" + memberId);
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_ReturnUrl", VnPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_Version", VnPayConfig.vnp_Version);
        // vnp_Params.put("vnp_BankCode", "NCB");

        try {
            cld.add(Calendar.MINUTE, 15);
            String vnp_ExpireDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            Iterator<String> itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = itr.next();
                String fieldValue = vnp_Params.get(fieldName);
                if (fieldValue != null && fieldValue.length() > 0) {
                    // Build hash data
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    // Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    if (itr.hasNext()) {
                        query.append('&');
                        hashData.append('&');
                    }
                }
            }
            String queryUrl = query.toString();
            String vnp_SecureHash = VnPayConfig.hmacSHA512(VnPayConfig.secretKey, hashData.toString());
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
            String paymentUrl = VnPayConfig.vnp_PayUrl + "?" + queryUrl;

            PaymentRes paymentRes = new PaymentRes();
            paymentRes.setStatus("Done");
            paymentRes.setMessage("Successfully");
            paymentRes.setUrl(paymentUrl);
            paymentRes.setVnp_TxnRef(vnp_TxnRef);

            return new ResponseCommon<>(ResponseCode.SUCCESS, paymentRes);
        } catch (Exception e) {
            // TODO: handle exception
        }
        return null;

    }

}
