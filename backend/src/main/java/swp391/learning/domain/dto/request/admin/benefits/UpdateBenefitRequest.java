package swp391.learning.domain.dto.request.admin.benefits;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateBenefitRequest {
    @NotNull
    private int id;
    private String name;
    private String description;
    private int memberSubscription;
}
