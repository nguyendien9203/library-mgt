package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swp391.learning.domain.entity.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Review findReviewById(int id);

    @Query("SELECT r FROM Review r WHERE r.book.id = :id ORDER BY r.updatedAt DESC")
    List<Review> findByBookId(@Param("id") int id);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.book.id = :bookId")
    Double findAverageRatingByBookId(@Param("bookId") int bookId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.book.id = :bookId")
    int countReviewsByBookId(@Param("bookId") int bookId);
}
