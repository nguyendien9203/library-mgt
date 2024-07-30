package swp391.learning.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import swp391.learning.application.service.BookCopyService;
import swp391.learning.domain.dto.common.ResponseError;
import swp391.learning.domain.dto.common.ResponseSuccess;
import swp391.learning.domain.dto.request.admin.book.BookCopyRequest;
import swp391.learning.exception.DuplicateResourceException;
import swp391.learning.exception.ResourceNotFoundException;

@RequestMapping("api/v1/book-copy")
@Slf4j
@RestController
@AllArgsConstructor
public class BookCopyController {
    private BookCopyService bookCopyService;

    @Operation(summary = "Add book copy")
    @PostMapping("/add-book-copy")
    public ResponseSuccess<?> addBookCopy(@Valid @RequestBody BookCopyRequest bookCopyRequest) {
        log.info("Add book copy");
        try {
            bookCopyService.addBookCopy(bookCopyRequest);
            return new ResponseSuccess<>(HttpStatus.CREATED.value(), "Thêm bản sao sách thành công");
        } catch (DuplicateResourceException e) {
            log.error("Add book copy failed: " + e.getMessage());
            return new ResponseError(HttpStatus.CONFLICT.value(), e.getMessage());
        } catch (ResourceNotFoundException e) {
            log.error("Add book copy failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Add book copy failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Thêm bản sao sách thất bại");
        }
    }

    @Operation(summary = "Update book copy")
    @PutMapping("/{bookCopyId}/update-book-copy")
    public ResponseSuccess<?> updateBookCopy(@PathVariable int bookCopyId, @Valid @RequestBody BookCopyRequest bookCopyRequest) {
        log.info("Update book copy");
        try {
            bookCopyService.updateBookCopy(bookCopyId, bookCopyRequest);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Cập nhật bản sao sách thành công");
        } catch (ResourceNotFoundException e) {
            log.error("Update book copy failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Update book copy failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Cập nhật bản sao sách thất bại");
        }
    }

    @Operation(summary = "Delete book copy")
    @DeleteMapping("/{bookCopyId}/delete-book-copy")
    public ResponseSuccess<?> deleteBookCopy(@PathVariable int bookCopyId) {
        log.info("Delete book copy");
        try {
            bookCopyService.deleteBookCopy(bookCopyId);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Xóa bản sao sách thành công");
        } catch (ResourceNotFoundException e) {
            log.error("Delete book copy failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e) {
            log.error("Delete book copy failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Xóa bản sao sách thất bại");
        }
    }


}
