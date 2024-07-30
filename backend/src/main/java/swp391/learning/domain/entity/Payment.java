package swp391.learning.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp391.learning.domain.enums.EnumPaymentGateway;
import swp391.learning.domain.enums.EnumPaymentProcess;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Payment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_gateway")
    private EnumPaymentGateway paymentGateway;
    @OneToOne
    @JoinColumn(name = "member_subscription_id", referencedColumnName = "id")
    private MemberSubscription memberSubscription;
    @Column(name = "transaction_id")
    private String transactionId;

    @Enumerated(EnumType.STRING)
    @Column(name="status_payment")
    private EnumPaymentProcess enumPaymentProcess;

    @Column(name = "amount")
    private double amount;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
