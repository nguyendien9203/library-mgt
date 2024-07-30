package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.entity.Author;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
    Author findAuthorByName(String name);
    Author findById(int id);
}
