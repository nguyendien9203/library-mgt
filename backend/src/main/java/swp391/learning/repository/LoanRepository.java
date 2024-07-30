package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.entity.Loan;
import swp391.learning.domain.enums.EnumLoanStatus;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Integer> {
    List<Loan> getLoansByUserId(int userId);

    @Query(value = "SELECT * FROM loan WHERE user_id = :userId AND status IN (:statuses)", nativeQuery = true)
    List<Loan> findByUserIdAndStatusIn(@Param("userId") int userId, @Param("statuses") List<String> statuses);

    List<Loan> getLoansByStatus(EnumLoanStatus status);

    List<Loan> getLoansByBookCopyIdAndStatus(int bookCopyId, EnumLoanStatus status);

    List<Loan> getLoansByBookCopyId(int bookCopyId);

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.status = :status")
    int countBooksPending(EnumLoanStatus status);

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.status = :status")
    int countBooksReturning(EnumLoanStatus status);

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.status = :status AND FUNCTION('DATE', l.createdAt) = CURRENT_DATE()")
    int countBooksBorrowedToday(EnumLoanStatus status);

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.status = :status AND FUNCTION('DATE', l.updatedAt) = CURRENT_DATE()")
    int countBooksReturnedToday(EnumLoanStatus status);

    @Query("SELECT COUNT(l) FROM Loan l WHERE l.status = :status AND FUNCTION('DATE', l.updatedAt) = CURRENT_DATE")
    int countBooksRejectedToday(EnumLoanStatus status);

    @Query("SELECT FUNCTION('HOUR', l.createdAt) AS hour, COUNT(l) AS count " +
            "FROM Loan l " +
            "WHERE l.createdAt BETWEEN :startOfDay AND :endOfDay " +
            "AND l.status = :status " +
            "GROUP BY FUNCTION('HOUR', l.createdAt) " +
            "ORDER BY FUNCTION('HOUR', l.createdAt)")
    List<Object[]> countBorrowedBooksByHour(@Param("startOfDay") LocalDateTime startOfDay,
                                            @Param("endOfDay") LocalDateTime endOfDay,
                                            @Param("status") EnumLoanStatus status);

    @Query("SELECT FUNCTION('HOUR', l.updatedAt) AS hour, COUNT(l) AS count " +
            "FROM Loan l " +
            "WHERE l.updatedAt BETWEEN :startOfDay AND :endOfDay " +
            "AND l.status = :status " +
            "GROUP BY FUNCTION('HOUR', l.updatedAt) " +
            "ORDER BY FUNCTION('HOUR', l.updatedAt)")
    List<Object[]> countReturnedBooksByHour(@Param("startOfDay") LocalDateTime startOfDay,
                                            @Param("endOfDay") LocalDateTime endOfDay,
                                            @Param("status") EnumLoanStatus status);



}
