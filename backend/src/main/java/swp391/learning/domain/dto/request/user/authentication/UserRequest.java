package swp391.learning.domain.dto.request.user.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String fullName;
    private String email;
    private String password;
    private String phoneNumber;
    private String status;
    private String role;
}
