package swp391.learning.domain.dto.response.user.membership;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PaymentConfirmResponse {
    @NotBlank
    private String status;
}