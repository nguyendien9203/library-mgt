package swp391.learning.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.entity.Otp;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Integer> {
    Otp findByEmail(String email);

    void deleteByEmail(String email);
}
