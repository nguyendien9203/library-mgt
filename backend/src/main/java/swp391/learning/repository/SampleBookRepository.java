package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import swp391.learning.domain.entity.SampleBook;

public interface SampleBookRepository extends JpaRepository<SampleBook, Integer>{
}
