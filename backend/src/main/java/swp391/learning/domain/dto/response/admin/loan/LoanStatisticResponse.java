package swp391.learning.domain.dto.response.admin.loan;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class LoanStatisticResponse {
    private int booksPending;
    private int booksReturning;
    private int booksBorrowedToday;
    private int booksReturnedToday;
    private int booksRejectedToday;
}
