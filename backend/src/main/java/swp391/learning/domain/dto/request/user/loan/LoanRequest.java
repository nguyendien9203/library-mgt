package swp391.learning.domain.dto.request.user.loan;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp391.learning.domain.entity.BookCopy;
import swp391.learning.domain.enums.EnumLoanStatus;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoanRequest {
    private BookCopy bookCopy;
    private LocalDateTime borrowAt; // thời gian mượn
    private LocalDateTime returnAt; // thời gian  trả
    private LocalDateTime dueDate; // thời hạn hết hạn trả sách
    private EnumLoanStatus status;
    private String note; // ghi chú
}
