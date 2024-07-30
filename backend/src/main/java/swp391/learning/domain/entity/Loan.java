package swp391.learning.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import swp391.learning.domain.enums.EnumLoanStatus;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Loan implements Serializable {

    public Loan(BookCopy bookCopy, User user, LocalDateTime borrowAt, LocalDateTime returnAt, LocalDateTime dueDate,
            EnumLoanStatus status, String note, double price) {
        this.bookCopy = bookCopy;
        this.user = user;
        this.borrowAt = borrowAt;
        this.returnAt = returnAt;
        this.dueDate = dueDate;
        this.status = status;
        this.note = note;
        this.price = price;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH })
    @JoinColumn(name = "book_copy_id")
    private BookCopy bookCopy;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST,
            CascadeType.REFRESH }, targetEntity = User.class)
    private User user;

    @Column(name = "borrow_at")
    private LocalDateTime borrowAt; // thời gian mượn

    @Column(name = "return_at")
    private LocalDateTime returnAt; // thời gian trả

    @Column(name = "due_date")
    private LocalDateTime dueDate; // thời hạn hết hạn trả sách

    @Column(name = "status", length = 50)
    @Enumerated(EnumType.STRING) // Specify how the enum is stored in the database
    private EnumLoanStatus status; // trạng thái mượn sách

    @Column(name = "note", columnDefinition = "TEXT")
    private String note; // ghi chú

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private double price;

}
