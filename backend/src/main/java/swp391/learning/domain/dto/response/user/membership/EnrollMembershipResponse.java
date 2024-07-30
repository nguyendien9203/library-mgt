package swp391.learning.domain.dto.response.user.membership;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EnrollMembershipResponse {
    @NotNull
    private int orderId;
    @NotBlank
    private String urlPayment;
}
