package swp391.learning.domain.dto.request.admin.benefits;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateBenefitRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    @NotNull
    private int memberSubscription;
}
