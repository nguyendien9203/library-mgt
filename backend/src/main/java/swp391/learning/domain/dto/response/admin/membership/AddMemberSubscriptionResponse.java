package swp391.learning.domain.dto.response.admin.membership;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddMemberSubscriptionResponse {
    @NotBlank
    private String message;
}