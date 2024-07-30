package swp391.learning.application.service;

import swp391.learning.domain.dto.request.user.review.ReviewRequest;
import swp391.learning.domain.dto.response.admin.Review.ReviewResponse;

import java.util.List;

public interface ReviewService {
    void addReview(ReviewRequest addReviewRequest);

    void updateReview(int id, ReviewRequest updateReviewRequest);

    void deleteReview(int id);

    List<ReviewResponse> findAllReviewByBookId(int id);

}
