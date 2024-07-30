package swp391.learning.domain.dto.request.user.book;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class SearchBookByNameAndCategoryRequest {
    @NotBlank
    private String keyword;
}

