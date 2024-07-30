package swp391.learning.application.service.Implements;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import swp391.learning.application.service.ReviewService;
import swp391.learning.domain.dto.request.user.review.ReviewRequest;
import swp391.learning.domain.dto.response.admin.Review.ReviewResponse;
import swp391.learning.domain.entity.Book;
import swp391.learning.domain.entity.Review;
import swp391.learning.domain.entity.User;
import swp391.learning.exception.ResourceNotFoundException;
import swp391.learning.repository.BookRepository;
import swp391.learning.repository.ReviewRepository;
import swp391.learning.repository.UserRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;


    @Override
    public void addReview(ReviewRequest addReviewRequest) {
        log.info("Adding review with bookId: {} and userId: {}", addReviewRequest.getBookId(), addReviewRequest.getUserId());

        User user = userRepository.findById(addReviewRequest.getUserId());
        if (user == null) {
            log.info("User with id {} not found", addReviewRequest.getUserId());
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        Book book = bookRepository.findById(addReviewRequest.getBookId());
        if(book == null) {
            log.info("Book with id {} not found", addReviewRequest.getBookId());
            throw new ResourceNotFoundException("Cuốn sách không tồn tại");
        }

        Review newReview = new Review();
        newReview.setRating(addReviewRequest.getRating());
        newReview.setFeedback(addReviewRequest.getFeedback());
        newReview.setUser(user);
        newReview.setBook(book);

        reviewRepository.save(newReview);
        log.info("Review added successfully");

    }

    @Override
    public void updateReview(int id, ReviewRequest updateReviewRequest) {
        log.info("Updating review with bookId: {} and userId: {}", updateReviewRequest.getBookId(), updateReviewRequest.getUserId());

        Review review = reviewRepository.findReviewById(id);
        if (review == null) {
            log.info("Review with id {} not found", id);
            throw new ResourceNotFoundException("Đánh giá không tồn tại");
        }

        User user = userRepository.findById(updateReviewRequest.getUserId());
        if (user == null) {
            log.info("User with id {} not found", updateReviewRequest.getUserId());
            throw new ResourceNotFoundException("Người dùng không tồn tại");
        }

        Book book = bookRepository.findById(updateReviewRequest.getBookId());
        if(book == null) {
            log.info("Book with id {} not found", updateReviewRequest.getBookId());
            throw new ResourceNotFoundException("Cuốn sách không tồn tại");
        }

        review.setRating(updateReviewRequest.getRating());
        review.setFeedback(updateReviewRequest.getFeedback());
        review.setUser(user);
        review.setBook(book);

        reviewRepository.save(review);
        log.info("Category updated successfully");

    }

    @Override
    public void deleteReview(int id) {
        log.info("Deleting review with id: {}", id);

        Review review = reviewRepository.findReviewById(id);
        if (review == null) {
            log.info("Review with id {} not found", id);
            throw new ResourceNotFoundException("Đánh giá không tồn tại");
        }

        reviewRepository.delete(review);
        log.info("Review deleted successfully");

    }

    @Override
    public List<ReviewResponse> findAllReviewByBookId(int id) {
        log.info("Retrieving all reviews for book with id {}", id);

        List<Review> reviews = reviewRepository.findByBookId(id);
        if (reviews.isEmpty()) {
            log.info("No reviews found for book with id {}", id);
            throw new ResourceNotFoundException("Không tìm thấy đánh giá cho cuốn sách");
        }

        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(this::mapToReviewResponse)
                .collect(Collectors.toList());

        log.info("Found {} reviews for book with id {}", reviews.size(), id);
        return reviewResponses;
    }
    
    private ReviewResponse mapToReviewResponse(Review review){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formattedDateTime = review.getUpdatedAt().format(formatter);

        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setMemberId(review.getUser().getId());
        response.setMemberName(review.getUser().getUsername());
        response.setRating(review.getRating());
        response.setFeedback(review.getFeedback());
        response.setUpdatedAt(formattedDateTime);
        return response;
    }

}

