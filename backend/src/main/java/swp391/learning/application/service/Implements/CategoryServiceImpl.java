package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.CategoryService;
import swp391.learning.domain.dto.request.admin.category.CategoryRequest;
import swp391.learning.domain.dto.response.admin.category.CategoryResponse;
import swp391.learning.domain.dto.response.admin.category.ParentCategoryResponse;
import swp391.learning.domain.entity.Category;
import swp391.learning.domain.entity.User;
import swp391.learning.exception.DuplicateResourceException;
import swp391.learning.exception.ResourceNotFoundException;
import swp391.learning.repository.CategoryRepository;
import swp391.learning.repository.UserRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public void addCategory(CategoryRequest addCategoryRequest) {
        log.info("Adding category with name: {} and userId: {}", addCategoryRequest.getName(), addCategoryRequest.getUserId());

        User user = userRepository.findById(addCategoryRequest.getUserId());
        if (user == null) {
            log.info("User with id {} not found", addCategoryRequest.getUserId());
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        Category existedCategory = categoryRepository.findCategoryByName(addCategoryRequest.getName());
        if (existedCategory != null) {
            log.error("Add Category failed: Category is existed");
            throw new DuplicateResourceException("Danh mục đã tồn tại");
        }

        Category newCategory = new Category();
        newCategory.setName(addCategoryRequest.getName());
        newCategory.setCreatedBy(user);
        newCategory.setUpdatedBy(user);

        if (addCategoryRequest.getParentId() != 0) {
            Category parentCategory = categoryRepository.findCategoryById(addCategoryRequest.getParentId());
            if (parentCategory == null) {
                log.info("Parent category with id {} not found", addCategoryRequest.getParentId());
                throw new ResourceNotFoundException("Danh mục cha không tồn tại");
            }
            newCategory.setParentCategory(parentCategory);
        }

        categoryRepository.save(newCategory);
        log.info("Category {} added successfully", newCategory.getName());
    }


    @Override
    public void updateCategory(int id, CategoryRequest updateCategoryRequest) {
        log.info("Updating category with id: {} and userId: {}", id, updateCategoryRequest.getUserId());

        Category category = categoryRepository.findCategoryById(id);
        if (category == null) {
            log.info("Category with id {} not found", id);
            throw new ResourceNotFoundException("Danh mục không tồn tại");
        }

        User user = userRepository.findById(updateCategoryRequest.getUserId());
        if (user == null) {
            log.info("User with id {} not found", updateCategoryRequest.getUserId());
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        category.setName(updateCategoryRequest.getName());
        category.setUpdatedBy(user);
        if (updateCategoryRequest.getParentId() == 0) {
            category.setParentCategory(null);
        } else {
            Category parentCategory = categoryRepository.findById(updateCategoryRequest.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Danh mục cha không tồn tại"));
            category.setParentCategory(parentCategory);
        }

        categoryRepository.save(category);
        log.info("Category {} updated successfully", category.getName());

    }

    @Override
    public void deleteCategory(int id) {
        log.info("Deleting category with id: {}", id);

        Category category = categoryRepository.findCategoryById(id);
        if (category == null) {
            log.info("Category with id {} not found", id);
            throw new ResourceNotFoundException("Danh mục không tồn tại");
        }

        categoryRepository.delete(category);
        log.info("Category {} deleted successfully", category.getName());
    }

    @Override
    public List<CategoryResponse> findAllCategory() {
        log.info("Retrieving all categories from the repository");

        List<Category> categories = categoryRepository.findAll();

        List<CategoryResponse> categoryResponses = categories.stream()
                .map(this::mapToCategoryResponse)
                .collect(Collectors.toList());

        log.info("Returning {} category responses", categoryResponses.size());

        return categoryResponses;
    }

    @Override
    public List<ParentCategoryResponse> findAllParentCategories() {
        log.info("Retrieving all parent categories from the repository");

        List<Category> parentCategories = categoryRepository.findAllByParentCategoryIsNull();

        List<ParentCategoryResponse> parentCategoryResponses = parentCategories.stream()
                .map(this::mapToParentCategoryResponse)
                .collect(Collectors.toList());

        log.info("Returning {} parent category responses", parentCategoryResponses.size());

        return parentCategoryResponses;
    }



    public CategoryResponse getCategoryById(int id) {
        log.info("Getting category with id: {}", id);
        Category category = categoryRepository.findCategoryById(id);
        if (category == null) {
            log.info("Category with id {} not found", id);
            throw new ResourceNotFoundException("Danh mục không tồn tại");
        }

        return mapToCategoryResponse(category);
    }

    private CategoryResponse mapToCategoryResponse(Category category) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formattedDateTime = category.getUpdatedAt().format(formatter);

        int parentId = category.getParentCategory() != null ? category.getParentCategory().getId() : 0;
        String parentName = category.getParentCategory() != null ? category.getParentCategory().getName() : null;

        return CategoryResponse.builder()
                .id(category.getId())
                .userId(category.getCreatedBy().getId())
                .name(category.getName())
                .parentId(parentId)
                .parentName(parentName)
                .updatedBy(category.getUpdatedBy().getFullName())
                .updatedAt(formattedDateTime)
                .build();
    }


    private ParentCategoryResponse mapToParentCategoryResponse(Category category) {
        return ParentCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }

}
