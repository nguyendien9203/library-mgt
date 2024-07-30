package swp391.learning.domain.dto.response.admin.BookCopy;

import lombok.*;
import swp391.learning.domain.dto.response.admin.book.BookResponse;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Builder
public class BookCopyResponse {
    private int id;
    private int userId;
    private String title;
    private String barcode;
    private String status;
    private String updatedBy;
    private String updatedAt;
    private List<LoanInfo> loanInfo;

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class LoanInfo {
        private int loanId;
        private String note;
    }
}
