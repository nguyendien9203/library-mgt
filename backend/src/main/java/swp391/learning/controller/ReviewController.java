package swp391.learning.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import swp391.learning.application.service.ReviewService;
import swp391.learning.domain.dto.common.ResponseError;
import swp391.learning.domain.dto.common.ResponseSuccess;
import swp391.learning.domain.dto.request.user.review.ReviewRequest;
import swp391.learning.domain.dto.response.admin.Review.ReviewResponse;
import swp391.learning.exception.ResourceNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/review")
@AllArgsConstructor
@Slf4j
public class ReviewController {
    private final ReviewService reviewService;

    @Operation(summary = "Add review")
    @PostMapping("/add-review")
    public ResponseSuccess<?> addReview(@Valid @RequestBody ReviewRequest addReviewRequest){
        log.info("Add review");
        try{
            reviewService.addReview(addReviewRequest);
            return new ResponseSuccess<>(HttpStatus.CREATED.value(), "Thêm đánh giá thành công");
        } catch (ResourceNotFoundException e){
            log.error("Add review failed: " + e.getMessage());
            return new ResponseError(HttpStatus.CONFLICT.value(), e.getMessage());
        } catch (Exception e){
            log.error("Add review failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Thêm đánh giá thất bại");
        }
    }

    @Operation(summary = "Update review")
    @PutMapping("/update-review/{id}")
    public ResponseSuccess<?> updateReview(@PathVariable int id, @RequestBody ReviewRequest updateReviewRequest){
        log.info("Update review");
        try{
            reviewService.updateReview(id, updateReviewRequest);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Cập nhật đánh giá thành công");
        } catch (ResourceNotFoundException e){
            log.error("Update review failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e){
            log.error("Update review failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Cập nhật đánh giá thất bại");
        }
    }

    @Operation(summary = "Delete review")
    @DeleteMapping("/delete-review/{id}")
    public ResponseSuccess<?> deleteReview(@PathVariable int id){
        log.info("Delete review");
        try{
            reviewService.deleteReview(id);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Xoá đánh giá thành công");
        } catch (ResourceNotFoundException e){
            log.error("Delete review failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        } catch (Exception e){
            log.error("Delete review failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Xoá đánh giá thất bại");
        }
    }

    @Operation(summary = "Get all review")
    @GetMapping("/get-all-review/{id}")
    public ResponseSuccess<?> getAllReviews(@PathVariable int id) {
        log.info("Get all reviews with book id {}", id);
        try {
            List<ReviewResponse> response = reviewService.findAllReviewByBookId(id);
            return new ResponseSuccess<>(HttpStatus.OK.value(), "Lấy danh sách đánh giá thành công", response);
        }catch (ResourceNotFoundException e) {
            log.error("Get all reviews failed: " + e.getMessage());
            return new ResponseError(HttpStatus.NOT_FOUND.value(), e.getMessage());
        }catch (Exception e) {
            log.error("Get all reviews failed: " + e.getMessage());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(),  "Lấy danh sách đánh giá thất bại");
        }
    }

}
