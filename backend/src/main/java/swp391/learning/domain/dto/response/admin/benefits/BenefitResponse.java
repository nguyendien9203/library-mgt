package swp391.learning.domain.dto.response.admin.benefits;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BenefitResponse {
    private int id;
    private String name;
    private String description;
}
