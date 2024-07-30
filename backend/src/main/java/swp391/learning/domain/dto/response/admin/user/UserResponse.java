package swp391.learning.domain.dto.response.admin.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private int id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String status;
    private String role;
    private boolean verified;
    private int membershipSubscriptionId;
}
