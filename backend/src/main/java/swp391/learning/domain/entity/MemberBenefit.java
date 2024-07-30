package swp391.learning.domain.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberBenefit {
    @EmbeddedId
    MemberBenefitKey id;

    @ManyToOne
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    MemberSubscription memberSubscription;

    @ManyToOne
    @MapsId("benefitId")
    @JoinColumn(name = "benefit_id")
    Benefits benefits;
}
