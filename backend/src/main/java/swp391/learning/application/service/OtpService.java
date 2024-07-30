package swp391.learning.application.service;

public interface OtpService {
    void generateAndSendOTP(String email);

    void deleteOtpByEmail(String email);

}

