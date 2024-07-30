package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swp391.learning.domain.entity.Benefits;

public interface BenefitsRepository extends JpaRepository<Benefits, Integer> {
    Benefits findByName(String name);
    // Benefits findById(int id);
    // Benefits updateBenefitsById(int id, Benefits benefits);

    void deleteById(int id);
}
