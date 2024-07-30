package swp391.learning.domain.dto.response.admin.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class ParentCategoryResponse {
    @NotNull
    private int id;
    @NotBlank
    private String name;
}
