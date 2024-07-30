package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import swp391.learning.application.service.OtpService;
import swp391.learning.domain.entity.Otp;
import swp391.learning.repository.OtpRepository;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class OtpServiceImpl implements OtpService {
    private final OtpRepository otpRepository;
    private final EmailService emailService;

    public void generateAndSendOTP(String email) {
        String otpCode = getOTP();

        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(1);

        var otp = Otp.builder()
                .email(email)
                .otp(otpCode)
                .expirationTime(expiryTime)
                .build();
        otpRepository.save(otp);

        sendOTPByEmail(email, otpCode);
    }

    private String getOTP() {
        Random random = new Random();
        int otpValue = 100000 + random.nextInt(900000);
        return String.valueOf(otpValue);
    }

    private void sendOTPByEmail(String email, String otp) {
        String subject = "Email verification";
        String body = "Your verification otp is: " + otp;
        emailService.sendEmail(email, subject, body);
    }

    @Override
    public void deleteOtpByEmail(String email) {
        otpRepository.deleteByEmail(email);
    }
}
