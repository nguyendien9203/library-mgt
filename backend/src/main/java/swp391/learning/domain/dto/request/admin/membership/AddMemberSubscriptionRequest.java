package swp391.learning.domain.dto.request.admin.membership;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
//import swp391.learning.domain.enums.EnumMembershipType;

// import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddMemberSubscriptionRequest {
    private String email;
    private String nameSubscription;
    private double fee_member;
    private String expireDate;
    private int maxBook;
    private List<String> selectedBenefits;
}