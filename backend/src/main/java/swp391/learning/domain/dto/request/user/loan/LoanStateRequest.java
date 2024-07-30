package swp391.learning.domain.dto.request.user.loan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoanStateRequest {
    private int loanId;
    private int bookCopyId;
    private String note;
}
