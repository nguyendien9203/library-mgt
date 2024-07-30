package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.AuthenticationService;
import swp391.learning.application.service.OtpService;
import swp391.learning.domain.dto.request.user.authentication.LoginRequest;
import swp391.learning.domain.dto.request.user.authentication.RegisterRequest;
import swp391.learning.domain.dto.response.user.authentication.AuthenticationResponse;
import swp391.learning.domain.entity.Otp;
import swp391.learning.domain.entity.User;
import swp391.learning.domain.enums.EnumTypeRole;
import swp391.learning.domain.enums.EnumUserStatus;
import swp391.learning.exception.*;
import swp391.learning.repository.OtpRepository;
import swp391.learning.repository.UserRepository;
import swp391.learning.security.JwtService;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final OtpService otpService;
    private final AuthenticationManager authenticationManager;


    @Override
    public void register(RegisterRequest registerRequest) {
        User existingUser = userRepository.findByEmail(registerRequest.getEmail());

        if (existingUser != null) {
            throw new DuplicateResourceException("Email đã tồn tại");
        }

        var user = User.builder()
                .fullName(registerRequest.getFullName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(EnumTypeRole.MEMBER)
                .status(EnumUserStatus.ACTIVE)
                .verified(false)
                .build();

        userRepository.save(user);

    }



    @Override
    public AuthenticationResponse verify(String email, String otp) {

        verifyOTP(email, otp);

        User user = userRepository.findByEmail(email);

        user.setVerified(true);
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    }

    @Override
    public boolean verifyOTP(String email, String otpCode) {
        Otp otp = otpRepository.findByEmail(email);

        if (otp == null || otp.getOtp() == null) {
            throw new InvalidOTPException("OTP đã được sử dụng hoặc đã hết hạn");
        } else if (!otp.getOtp().equals(otpCode)) {
            throw new InvalidOTPException("Mã OTP không hợp lệ");
        } else if (otp.getExpirationTime().isBefore(LocalDateTime.now())) {
            throw new InvalidOTPException("Mã OTP đã hết hạn");
        } else {
            otpRepository.delete(otp);
            return true;
        }
    }


    @Override
    public void sendOtp(String email) {
        otpService.deleteOtpByEmail(email);
        otpService.generateAndSendOTP(email);
    }

    @Override
    public boolean checkEmailExist(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("Email không tồn tại");
        }
        return true;
    }


    @Override
    public void changePassword(String otp, String email, String newPassword) {
        log.info("Changing password with otp: {}, email: {}, newPassword: {}", otp, email, newPassword);

        verifyOTP(email, otp);

        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }

    }

    @Override
    public AuthenticationResponse authenticate(LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            User user = userRepository.findByEmail(loginRequest.getEmail());
            System.out.println(user.getStatus());

            System.out.println(user.getVerified());

            if (!user.getVerified()) {
                throw new UserDisabledException("Email chưa được xác thực");
            }else if (user.getStatus() == EnumUserStatus.INACTIVE) {
                System.out.println("Tài khoản đã bị vô hiệu hóa");
                throw new AccountLockedException("Tài khoản đã bị vô hiệu hóa");
            }

            String jwtToken = jwtService.generateToken(user);

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (UserDisabledException | AccountLockedException e) {
            throw e;
        } catch (Exception e) {
            throw new InvalidCredentialsException("Email hoặc mật khẩu không hợp lệ");
        }
    }


}
