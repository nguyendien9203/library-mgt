package swp391.learning.domain.dto.response.admin.book;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class SubCategoryBookResponse {
    private String subCategoryName;
    List<BookResponse> books;

}
