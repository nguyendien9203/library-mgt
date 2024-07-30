package swp391.learning.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import swp391.learning.domain.enums.EnumTypeProcessPayment;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Accessors(chain = true)
@Data
public class Order implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName = "id")
    private User user;
    @OneToOne
    @JoinColumn(name="payment",referencedColumnName = "id")
    private Payment payment;
    @ManyToOne
    @JoinColumn(name = "member_subscription_id", referencedColumnName = "id")
    private MemberSubscription memberSubscription;
    @Column(name="amount")
    private double amount;
    @Enumerated(EnumType.STRING)
    @Column(name = "process")
    private EnumTypeProcessPayment enumTypeProcessPayment;
    @Column(name="created_at")
    private LocalDateTime created_at;
    @Column(name="deleted")
    private boolean isDeleted;
    @Column(name = "checksum")
    private String checksum;
    private String status;
}
