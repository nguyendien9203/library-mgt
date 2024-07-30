package swp391.learning.domain.dto.response.admin.Review;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class ReviewResponse {
    private int id;
    private int memberId;
    private String memberName;
    private int rating;
    private String feedback;
    private String updatedAt;
}
