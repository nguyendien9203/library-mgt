package swp391.learning.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import swp391.learning.application.service.AuthenticationService;
import swp391.learning.application.service.UserService;
import swp391.learning.domain.dto.common.ResponseError;
import swp391.learning.domain.dto.common.ResponseSuccess;
import swp391.learning.domain.dto.request.user.authentication.*;
import swp391.learning.domain.dto.response.admin.user.UserResponse;
import swp391.learning.domain.dto.response.user.authentication.AuthenticationResponse;
import swp391.learning.domain.entity.User;
import swp391.learning.exception.AccountLockedException;
import swp391.learning.exception.InvalidCredentialsException;
import swp391.learning.exception.UserDisabledException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    @GetMapping("/whoami")
    public ResponseEntity<UserResponse> whoami(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String userEmail = userDetails.getUsername();
        // get user by email
        User user = userService.getUserByEmail(userEmail);
        return ResponseEntity.ok().body(userService.mapToUserResponse(user));
    }

    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ResponseSuccess<?> register(
            @RequestBody RegisterRequest registerRequest
    ) {
        log.info("Registering user: {}", registerRequest.getEmail());
        try {
            authenticationService.register(registerRequest);
            log.info("Register successfully");
            return new ResponseSuccess<>(HttpStatus.CREATED.value(), "Đăng ký thành công");
        } catch (RuntimeException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage(), e);
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Đăng ký thất bại");
        }
    }



    @Operation(summary = "Verify a user")
    @PostMapping("/verify")
    public ResponseSuccess<?> verifyUser(@RequestBody VerifyRequest verifyRequest){
        String email = verifyRequest.getEmail();
        String otp = verifyRequest.getOtp();
        log.info("Verifying user: {}", email);
        try {
            AuthenticationResponse response = authenticationService.verify(email, otp);
            return new ResponseSuccess<>(HttpStatus.OK.value(),"Xác thực tài khoản thành công", response);
        } catch (RuntimeException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage(), e);
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Xác thực tài khoản thất bại");
        }
    }

    @Operation(summary = "Send OTP to user")
    @PostMapping("/send-otp")
    public ResponseSuccess<?> sendOtp(@RequestBody EmailRequest emailRequest){
        String email = emailRequest.getEmail();
        log.info("Sending OTP to user: {}", email);
        try {
            authenticationService.sendOtp(email);
            return new ResponseSuccess<>(HttpStatus.OK.value(),"OTP đã được gửi thành công");
        } catch (RuntimeException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage(), e);
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Gửi OTP thất bại");
        }
    }

    @Operation(summary = "Resend OTP")
    @PostMapping("/resend-otp")
    public ResponseSuccess<?> resendOtp(@RequestBody EmailRequest emailRequest){
        String email = emailRequest.getEmail();
        log.info("Resending OTP to user: {}", email);
        try {
            authenticationService.sendOtp(email);
            return new ResponseSuccess<>(HttpStatus.OK.value(),"OTP đã được gửi lại thành công");
        } catch (RuntimeException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage(), e);
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Gửi lại OTP thất bại");
        }
    }

    @Operation(summary = "Authenticate a user")
    @PostMapping("/authenticate")
    public ResponseSuccess<?> authenticate(
            @RequestBody LoginRequest loginRequest
    ) {
        log.info("Authenticating user: {}", loginRequest.getEmail());
        try {
            AuthenticationResponse response = authenticationService.authenticate(loginRequest);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Authenticate successfully", response);
        } catch (UserDisabledException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseSuccess<>(HttpStatus.FOUND.value(), e.getMessage());
        } catch (InvalidCredentialsException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseError(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
        } catch (AccountLockedException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseError(HttpStatus.LOCKED.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage(), e);
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Authenticate failed");
        }
    }

    @Operation(summary = "Check email exist")
    @PostMapping("/forgot-password")
    public ResponseSuccess<?> checkEmailExist(@RequestBody EmailRequest emailRequest){
        String email = emailRequest.getEmail();
        log.info("Checking email: {}", email);
        try {
            boolean check = authenticationService.checkEmailExist(email);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Email đã tồn tại", check);
        } catch (RuntimeException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage(), e);
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Kiểm tra email thất bại");
        }
    }

    @Operation(summary = "Reset password")
    @PostMapping("/reset-password")
    public ResponseSuccess<?> changePassword(@RequestBody ResetPasswordRequest resetPasswordRequest){
        String email = resetPasswordRequest.getEmail();
        String otp = resetPasswordRequest.getOtp();
        String newPassword = resetPasswordRequest.getNewPassword();
        log.info("Changing password for email: {}, otp: {}, newPassword: {}", email, otp, newPassword);

        try {
            authenticationService.changePassword(otp, email, newPassword);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Đổi mật khẩu thành công");
        } catch (RuntimeException e) {
            log.error("Error: {}", e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage(), e);
            return new ResponseError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Đổi mật khẩu thất bại");
        }
    }





}
