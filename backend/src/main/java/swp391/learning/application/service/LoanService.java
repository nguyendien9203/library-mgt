package swp391.learning.application.service;

import swp391.learning.domain.dto.response.admin.loan.DailyHourlyLoanDataResponse;
import swp391.learning.domain.dto.response.admin.loan.LoanStatisticResponse;
import swp391.learning.domain.dto.response.user.rent.LoanBookResponse;
import swp391.learning.domain.dto.response.user.rent.RentResponse;
import swp391.learning.domain.entity.Loan;
import swp391.learning.domain.enums.EnumLoanStatus;

import java.time.LocalDate;
import java.util.List;

public interface LoanService {
    void addLoan(Loan loan);

    List<RentResponse> getLoansByUserIdAndActive(int userId);
    List<RentResponse> getLoansWithPendingState();
    List<RentResponse> getLoansWithRejectState();
    List<RentResponse> getLoansWithReturnState();
    Loan approveLoan(int loanId, int bookCopyId);
    Loan rejectLoan(int loanId, int bookCopyId, String note);

    Loan returningLoan(int loanId, int bookCopyId);
    Loan returnLoan(int loanId, int bookCopyId);
    List<RentResponse> getLoansWithReturningState();

    List<LoanBookResponse> getLoanBookByUserIdAndStatus(int userId, EnumLoanStatus status);

    LoanStatisticResponse getLoanStatistic();

    DailyHourlyLoanDataResponse getHourlyLoanData(LocalDate date);
    
}
