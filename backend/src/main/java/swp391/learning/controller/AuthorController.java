package swp391.learning.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import swp391.learning.application.service.AuthorService;
import swp391.learning.domain.dto.common.ResponseError;
import swp391.learning.domain.dto.common.ResponseSuccess;
import swp391.learning.domain.dto.request.admin.author.AuthorRequest;
import swp391.learning.domain.dto.response.admin.author.AuthorResponse;
import swp391.learning.exception.DuplicateResourceException;
import swp391.learning.exception.ResourceNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/author")
@AllArgsConstructor
@Log4j2
public class AuthorController {
    private AuthorService authorService;

    @Operation(summary = "Add author")
    @PostMapping("/add-author")
    public ResponseSuccess<?> addAuthor(@Valid @RequestBody AuthorRequest addAuthorRequest) {
        log.info("Add author");
        try {
            authorService.addAuthor(addAuthorRequest);
            return new ResponseSuccess<>(HttpStatus.CREATED.value(), "Thêm tác giả thành công");
        } catch (DuplicateResourceException e) {
            log.error("Add author failed: " + e.getMessage());
            return new ResponseError(HttpStatus.CONFLICT.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Add author failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Thêm tác giả thất bại");
        }
    }

    @Operation(summary = "Update author")
    @PutMapping("/update-author/{id}")
    public ResponseSuccess<?> updateAuthor(@PathVariable int id, @RequestBody AuthorRequest updateAuthorRequest) {
        log.info("Update author");
        try {
            authorService.updateAuthor(id, updateAuthorRequest);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Cập nhật tác giả thành công");
        } catch (ResourceNotFoundException e) {
            log.error("Update author failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (DuplicateResourceException e) {
            log.error("Update author failed: " + e.getMessage());
            return new ResponseError(HttpStatus.CONFLICT.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Update author failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Cập nhật tác giả thất bại");
        }
    }

    @Operation(summary = "Delete author")
    @DeleteMapping("/delete-author/{id}")
    public ResponseSuccess<?> deleteAuthor(@PathVariable int id) {
        log.info("Delete author");
        try {
            authorService.deleteAuthor(id);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Xoá tác giả thành công");
        } catch (ResourceNotFoundException e) {
            log.error("Delete author failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Delete author failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Xoá tác giả thất bại");
        }
    }

    @Operation(summary = "Get all author")
    @GetMapping("/get-all-author")
    public ResponseSuccess<?> getAllAuthor() {
        log.info("Get all authors");
        try {
            List<AuthorResponse> response = authorService.findAllAuthor();
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Lấy danh sách tác giả thành công", response);
        } catch (Exception e) {
            log.error("Lỗi khi lấy danh sách tác giả: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Lấy danh sách tác giả thất bại");
        }
    }

    @GetMapping("/get-author-by-id/{id}")
    public ResponseSuccess<?> getAuthorById(@PathVariable int id) {
        log.info("Get author by id");
        try {
            AuthorResponse response = authorService.getAuthorById(id);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Lấy thông tin tác giả thành công", response);
        } catch (ResourceNotFoundException e) {
            log.error("Get author by id failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Get author by id failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Lấy thông tin tác giả thất bại");
        }
    }
}


