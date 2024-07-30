package swp391.learning.domain.dto.request.user.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

public class ReviewRequest {
    @NotNull
    private int userId;
    @NotNull
    private int bookId;
    @NotNull
    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private int rating;
    private String feedback;
}
