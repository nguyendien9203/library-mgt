    package swp391.learning.domain.entity;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;
    import lombok.experimental.Accessors;
    import org.hibernate.annotations.CreationTimestamp;
    import org.hibernate.annotations.UpdateTimestamp;
    import swp391.learning.domain.enums.EnumBookStatus;

    import java.io.Serializable;
    import java.math.BigDecimal;
    import java.time.LocalDateTime;
    import java.util.Set;

@Entity
@Table(name = "book")
@Accessors(chain = true)
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Book implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String desc; // gioi thieu sach

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "book_author",
            joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "author_id", referencedColumnName = "id")
    )
    private Set<Author> authors;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "book_category",
            joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id")
    )
    private Set<Category> categories;

    @JsonIgnore
    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SampleBook> sampleBooks;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BookCopy> bookCopies;

    @OneToMany(mappedBy = "book",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews;

    @Column(name = "imagePath")
    private String imagePath;

    @Column(name="price")
    private BigDecimal price; // gia quyen sach ben ngoai

    @Column(name="ISBN")
    private String ISBN; // ma quyen sach

    @Column(name="total_page")
    private int totalPage;

    @Column(name="language")
    private String language;

    @Column(name="publisher")
    private String publisher; // nha xuat ban

    @Column(name="publication_year")
    private int publicationYear; // nam xuat ban

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private EnumBookStatus status;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt; // thoi gian tao

    @Column(name="updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt; // thời gian cap nhat

    @ManyToOne
    @JoinColumn (name="created_by",referencedColumnName = "id")
    private User userCreated; // nguoi tạo

    @ManyToOne
    @JoinColumn(name="updated_by",referencedColumnName = "id")
    private User userUpdated; // nguoi sua
}
