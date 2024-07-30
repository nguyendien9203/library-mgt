package swp391.learning.domain.dto.request.admin.membership;

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
public class DeleteMemberSubscriptionRequest {
    @NotBlank
    private String email;
    @NotNull
    private int subscriptionId;
}
