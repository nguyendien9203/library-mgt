package swp391.learning.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.entity.Book;
import swp391.learning.domain.enums.EnumBookStatus;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Book findById(int id);

    Book findByISBN(String isbn);

    Page<Book> findAll(Specification<Book> spec, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.status = :statusParam ORDER BY b.publicationYear DESC")
    List<Book> findNewestBooksByStatus(EnumBookStatus statusParam, Pageable pageable);

    @Query("SELECT b FROM Book b JOIN b.categories c WHERE c.id = :categoryId AND b.status = :statusParam")
    List<Book> findAllByCategoryIdAndStatus(int categoryId, EnumBookStatus statusParam);


}

