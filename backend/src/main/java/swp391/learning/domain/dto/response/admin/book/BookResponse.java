package swp391.learning.domain.dto.response.admin.book;

import lombok.*;
import swp391.learning.domain.dto.response.admin.BookCopy.BookCopyResponse;
import swp391.learning.domain.dto.response.admin.Review.ReviewResponse;
import swp391.learning.domain.dto.response.admin.SampleBook.SampleBookResponse;
import swp391.learning.domain.dto.response.admin.author.AuthorResponse;
import swp391.learning.domain.dto.response.admin.category.CategoryResponse;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class BookResponse {
    private int id;
    private int userId;
    private String isbn;
    private String title;
    private String updatedAt;
    private String updatedBy;
    private double rating;
    private int totalReviews;
    private String description;
    private BigDecimal price;
    private int totalPage;
    private String language;
    private String publisher;
    private int publicationYear;
    private int stock;
    private String status;
    private String imagePath;
    private Set<CategoryResponse> categories;
    private Set<AuthorResponse> authors;
    private Set<SampleBookResponse> sampleBooks;
    private Set<BookCopyResponse> bookCopies;
    private List<ReviewResponse> reviews;
}
