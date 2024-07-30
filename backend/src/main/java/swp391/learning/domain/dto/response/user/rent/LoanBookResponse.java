package swp391.learning.domain.dto.response.user.rent;

import lombok.*;
import swp391.learning.domain.dto.response.admin.BookCopy.BookCopyResponse;
import swp391.learning.domain.dto.response.admin.author.AuthorResponse;
import swp391.learning.domain.dto.response.admin.book.BookResponse;
import swp391.learning.domain.entity.Author;

import java.util.Set;

@Data
public class LoanBookResponse {
    private int loanId;
    private int userId;
    private String borrowAt;
    private String returnAt;
    private String dueDate;
    private String note;
    private String status;
    private BookCopyResponse bookCopyResponse;

    @Data
    public static class BookCopyResponse {
        private int id;
        private String barcode;
        private BookResponse bookResponse;

        @Data
        public static class BookResponse {
            private int id;
            private String title;
            private double rating;
            private int publicationYear;
            private String imagePath;
            private Set<AuthorResponse> authors;
        }
    }

    @Data
    public static class AuthorResponse {
        private int id;
        private String name;
    }
}
