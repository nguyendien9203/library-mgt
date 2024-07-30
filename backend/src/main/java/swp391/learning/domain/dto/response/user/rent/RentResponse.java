package swp391.learning.domain.dto.response.user.rent;

import lombok.*;
import swp391.learning.domain.dto.response.admin.BookCopy.BookCopyResponse;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RentResponse {
    private int loanId;
    private String userName;
    private BookCopyResponse bookCopyResponse;
    private int memberId;
    private int maxBook;
    private double memFee;
    private double price;
    private int userId;
    private String status;
    private String note; // ghi chú
    private LocalDateTime borrowAt; // thời gian mượn
    private LocalDateTime returnAt; // thời gian trả
    private LocalDateTime dueDate; // thời hạn hết hạn trả sách

}
