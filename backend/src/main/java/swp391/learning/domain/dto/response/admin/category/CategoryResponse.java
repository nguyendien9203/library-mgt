package swp391.learning.domain.dto.response.admin.category;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class CategoryResponse {
    private int id;
    private int userId;
    private int parentId;
    private String name;
    private String parentName;
    private String updatedBy;
    private String updatedAt;
}
