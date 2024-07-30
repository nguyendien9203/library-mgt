package swp391.learning.domain.dto.response.admin.loan;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class DailyHourlyLoanDataResponse {
    private Map<Integer, Long> borrowedBooksByHour;
    private Map<Integer, Long> returnedBooksByHour;
}
