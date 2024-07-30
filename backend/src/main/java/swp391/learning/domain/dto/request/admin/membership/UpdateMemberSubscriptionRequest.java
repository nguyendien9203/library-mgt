package swp391.learning.domain.dto.request.admin.membership;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp391.learning.domain.dto.response.user.membership.MembershipResponse.BenefitDTO;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateMemberSubscriptionRequest {
    private int subId;
    private String email;
    private String nameSubscription;
    private double fee_member;
    private String expireDate;
    private int maxBook;
    private List<BenefitDTO> selectedBenefits;
}
