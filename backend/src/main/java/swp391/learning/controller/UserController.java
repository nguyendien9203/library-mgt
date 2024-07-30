package swp391.learning.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import swp391.learning.application.service.UserService;
import swp391.learning.domain.dto.common.ResponseError;
import swp391.learning.domain.dto.common.ResponseSuccess;
import swp391.learning.domain.dto.request.user.authentication.UserRequest;
import swp391.learning.exception.DuplicateResourceException;


@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @Operation(summary = "List user by role")
    @GetMapping("/list-user-by-role")
    public ResponseSuccess<?> listUserByRole() {
        log.info("List user by role");
        try {
            return new ResponseSuccess<>(HttpStatus.OK.value(), "List user by role successfully", userService.getAllUserByRole());
        } catch (Exception e) {
            log.error("List user by role failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "List user by role failed");
        }
    }

    @Operation(summary = "Get user by id")
    @GetMapping("/get-user-by-id/{id}")
    public ResponseSuccess<?> getUserById(@PathVariable int id) {
        log.info("Get user by id");
        try {
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Get user by id successfully", userService.getUserById(id));
        } catch (Exception e) {
            log.error("Get user by id failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get user by id failed");
        }
    }

    @Operation(summary = "Add user")
    @PostMapping("/add-user")
    public ResponseSuccess<?> addUser(@RequestBody UserRequest userRequest) {
        log.info("Add user");
        try {
            userService.addUser(userRequest);
            return new ResponseSuccess<>(HttpStatus.CREATED.value(), "Thêm thành công");
        } catch (DuplicateResourceException e) {
            log.error("Add user failed: " + e.getMessage());
            return new ResponseError(HttpStatus.CONFLICT.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Add user failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }

    @Operation(summary = "Update user")
    @PutMapping("/update-user/{id}")
    public ResponseSuccess<?> updateUser(@PathVariable int id, @RequestBody UserRequest userRequest) {
        log.info("Update user");
        try {
            userService.updateUser(id, userRequest);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Cập nhật thành công");
        } catch (Exception e) {
            log.error("Update user failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }
    @Operation(summary = "Get user chart")
    @GetMapping("/get-user-chart")
    public ResponseSuccess<?> getUserChart() {
        log.info("Get user chart");
        try {
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Get user chart successfully", userService.getUserChart());
        } catch (Exception e) {
            log.error("Get user chart failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get user chart failed");
        }
    }

}