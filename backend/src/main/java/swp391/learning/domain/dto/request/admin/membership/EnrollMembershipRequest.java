package swp391.learning.domain.dto.request.admin.membership;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EnrollMembershipRequest {
    @NotNull
    private int membershipId;
    @NotBlank
    private String email;
    @NotBlank
    private String vnp_TransactionNo;
}
