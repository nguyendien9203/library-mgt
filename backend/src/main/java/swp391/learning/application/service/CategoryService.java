package swp391.learning.application.service;

import swp391.learning.domain.dto.request.admin.category.CategoryRequest;
import swp391.learning.domain.dto.response.admin.category.CategoryResponse;
import swp391.learning.domain.dto.response.admin.category.ParentCategoryResponse;

import java.util.List;

public interface CategoryService {
    void addCategory(CategoryRequest addCategoryRequest);

    void updateCategory(int id, CategoryRequest addCategoryRequest);

    void deleteCategory(int id);

    List<CategoryResponse> findAllCategory();

    List<ParentCategoryResponse> findAllParentCategories();

    CategoryResponse getCategoryById(int id);

}
