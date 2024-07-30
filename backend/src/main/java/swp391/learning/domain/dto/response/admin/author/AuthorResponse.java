package swp391.learning.domain.dto.response.admin.author;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class AuthorResponse {
    private int id;
    private int userId;
    private String name;
    private String description;
    private String updatedBy;
    private String updatedAt;
}
