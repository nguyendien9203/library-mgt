package swp391.learning.application.service;


import swp391.learning.domain.dto.request.user.authentication.LoginRequest;
import swp391.learning.domain.dto.request.user.authentication.RegisterRequest;
import swp391.learning.domain.dto.response.user.authentication.AuthenticationResponse;

public interface AuthenticationService {
    void register(RegisterRequest registerRequest);

    AuthenticationResponse authenticate(LoginRequest loginRequest);

    AuthenticationResponse verify(String email, String otp);

    boolean verifyOTP(String email, String otpCode);

    void sendOtp(String email);

    boolean checkEmailExist(String email);

    void changePassword(String otp, String email, String newPassword);



}
