package swp391.learning.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "member_subscription")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberSubscription implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nameSubscription")
    private String nameSubscription; // tên gói
    // @Column(name = "subscription_plan")
    // private String subscriptionPlan;
    @Column(name = "fee_member")
    private double feeMember; // phí gói thành viên
    private boolean isDeleted = false;
    private int maxBook;
    @Column(name = "expire_date", nullable = true)
    private int expireDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt; // ngay goi duoc tạo ra

//    @ManyToOne
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private User userCreated;
//    @ManyToOne
//    @JoinColumn(name = "updated_by", referencedColumnName = "id")
//    private User userUpdated;

    @OneToMany(mappedBy = "memberSubscription")
    Set<MemberBenefit> memberBenefits;
}
