package swp391.learning.domain.dto.response.admin.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class UserChartResponse {
    private int totalUser;
    private int totalLibrarian;
    private int totalMember;
}