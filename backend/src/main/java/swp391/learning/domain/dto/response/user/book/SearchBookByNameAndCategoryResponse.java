package swp391.learning.domain.dto.response.user.book;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import swp391.learning.domain.entity.Book;

import java.util.List;
@AllArgsConstructor
@Getter
@Setter
public class SearchBookByNameAndCategoryResponse {
        @NotEmpty
        List<Book> bookList;
}
