package swp391.learning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import swp391.learning.domain.entity.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer> {

    List<Category> findAllByParentCategoryIsNull();
    Category findCategoryByName(String name);
    Category findCategoryById(int id);
    @Query("SELECT DISTINCT c FROM Category c WHERE c.parentCategory IS NOT NULL")
    List<Category> findAllSubCategories();
    @Query("SELECT DISTINCT c FROM Category c WHERE c.parentCategory.id = :parentId")
    List<Category> findAllByParentCategory(int parentId);

}
