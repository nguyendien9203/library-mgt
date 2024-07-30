package swp391.learning.application.service;



import swp391.learning.domain.dto.request.user.authentication.UserRequest;
import swp391.learning.domain.dto.response.admin.user.UserChartResponse;
import swp391.learning.domain.dto.response.admin.user.UserResponse;
import swp391.learning.domain.entity.User;

import java.util.List;

public interface UserService {
    List<UserResponse> getAllUserByRole();

    void addUser(UserRequest userRequest);

    void updateUser(int id, UserRequest userRequest);

    UserResponse getUserById(int id);
    User getUserByEmail(String email);
    UserResponse mapToUserResponse(User user);
    UserChartResponse getUserChart();
}
