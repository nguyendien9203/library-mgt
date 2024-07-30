package swp391.learning.domain.dto.request.user.payment;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GetPaymentByUserRequest {
    @NotBlank
    private String username;
    @NotBlank
    private double amount;
}
