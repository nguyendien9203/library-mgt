package swp391.learning.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import swp391.learning.application.service.CategoryService;
import swp391.learning.domain.dto.common.ResponseError;
import swp391.learning.domain.dto.common.ResponseSuccess;
import swp391.learning.domain.dto.request.admin.category.CategoryRequest;
import swp391.learning.domain.dto.response.admin.category.CategoryResponse;
import swp391.learning.domain.dto.response.admin.category.ParentCategoryResponse;
import swp391.learning.exception.DuplicateResourceException;
import swp391.learning.exception.ResourceNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@AllArgsConstructor
@Slf4j
public class CategoryController {
    private final CategoryService categoryService;

    @Operation(summary = "Add category")
    @PostMapping("/add-category")
    public ResponseSuccess<?> addCategory(@Valid @RequestBody CategoryRequest addCategoryRequest){
        log.info("Add category");
        try{
            categoryService.addCategory(addCategoryRequest);
            return new ResponseSuccess<>(HttpStatus.CREATED.value(), "Thêm danh mục thành công");
        } catch (DuplicateResourceException e){
            log.error("Add category failed: " + e.getMessage());
            return new ResponseError(HttpStatus.CONFLICT.value(), e.getMessage());
        } catch (Exception e){
            log.error("Add category failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Thêm danh mục thất bại");
        }
    }

    @Operation(summary = "Update category")
    @PutMapping("/update-category/{id}")
    public ResponseSuccess<?> updateCategory( @PathVariable int id, @RequestBody CategoryRequest updateCategoryRequest){
        log.info("Update category");
        try{
            categoryService.updateCategory(id, updateCategoryRequest);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Cập nhật danh mục thành công");
        } catch (ResourceNotFoundException e){
            log.error("Update category failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (DuplicateResourceException e){
            log.error("Update category failed: " + e.getMessage());
            return new ResponseError(HttpStatus.CONFLICT.value(), e.getMessage());
        } catch (Exception e){
            log.error("Update category failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Cập nhật danh mục thất bại");
        }
    }

    @Operation(summary = "Delete category")
    @DeleteMapping("/delete-category/{id}")
    public ResponseSuccess<?> deleteCategory(@PathVariable int id){
        log.info("Delete category");
        try{
            categoryService.deleteCategory(id);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Xoá danh mục thành công");
        } catch (ResourceNotFoundException e){
            log.error("Delete category failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e){
            log.error("Delete category failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Xoá danh mục thất bại");
        }
    }

    @Operation(summary = "Get all category")
    @GetMapping("/get-all-category")
    public ResponseSuccess<?> getAllCategories() {
        log.info("Get all categories");
        try {
            List<CategoryResponse> response = categoryService.findAllCategory();
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Lấy danh sách danh mục thành công", response);
        } catch (Exception e) {
            log.error("Get all categories failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Lấy danh sách danh mục thất bại");
        }
    }

    @Operation(summary = "Get all parent category")
    @GetMapping("/get-all-parent-category")
    public ResponseSuccess<?> getAllParentCategories() {
        log.info("Get all parent categories");
        try {
            List<ParentCategoryResponse> response = categoryService.findAllParentCategories();
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Lấy danh sách danh mục cha thành công", response);
        } catch (Exception e) {
            log.error("Get all parent categories failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Lấy danh sách danh mục cha thất bại");
        }
    }


    @Operation(summary = "Get category by id")
    @GetMapping("/get-category-by-id/{id}")
    public ResponseSuccess<?> getCategoryById(@PathVariable int id) {
        log.info("Get category by id");
        try {
            CategoryResponse response = categoryService.getCategoryById(id);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Lấy danh mục thành công", response);
        } catch (ResourceNotFoundException e) {
            log.error("Get category by id failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Get category by id failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Lấy danh mục thất bại");
        }
    }
}
