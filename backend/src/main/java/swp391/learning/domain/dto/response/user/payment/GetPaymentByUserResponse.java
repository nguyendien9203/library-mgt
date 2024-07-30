package swp391.learning.domain.dto.response.user.payment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GetPaymentByUserResponse {
    @NotNull
    private LocalDateTime createdAt;
    @NotBlank
    private String status;
    @NotNull
    private double amount;
    @NotBlank
    private String membership;
}
