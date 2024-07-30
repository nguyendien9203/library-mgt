package swp391.learning.application.specification;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import swp391.learning.domain.entity.Book;
import swp391.learning.domain.enums.EnumBookStatus;

@Slf4j
public class BookSpecifications {
    public static Specification<Book> hasCategoryId(Integer categoryId) {
        return (root, query, criteriaBuilder) -> {
            log.info("Building category specification for categoryId: {}", categoryId);
            return criteriaBuilder.equal(root.join("categories").get("id"), categoryId);
        };
    }

    public static Specification<Book> containsName(String name) {
        return (root, query, criteriaBuilder) -> {
            log.info("Building name specification for name: {}", name);
            return criteriaBuilder.like(root.get("title"), "%" + name + "%");
        };
    }

    public static Specification<Book> hasStatus(EnumBookStatus status) {
        return (root, query, criteriaBuilder) -> {
            log.info("Building status specification for status: {}", status);
            return criteriaBuilder.equal(root.get("status"), status);
        };
    }
}

