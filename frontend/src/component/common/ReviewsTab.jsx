import React, { useState, useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Rating from "react-rating";
import { Form, Button, ListGroup, Dropdown } from "react-bootstrap";
import TextArea from "./TextArea";
import { useAuth } from "../../component/context/AuthContext";
import {
  addReview,
  updateReview,
  deleteReview,
} from "../../service/ReviewService";
import useNotification from "../../hooks/useNotification";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";

const ReviewsTab = ({ bookId, reviews, fetchBookDetail, totalReviews }) => {
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [expanded, setExpanded] = useState({});
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const { isLibrarian, user, isUserAuthenticated } = useAuth();

  const [librarian, setLibrarian] = useState(isLibrarian);
  const [authenticated, setAuthenticated] = useState(isUserAuthenticated);

  useEffect(() => {
    setLibrarian(isLibrarian);
    setAuthenticated(isUserAuthenticated);
  }, [isLibrarian, isUserAuthenticated]);

  const [formData, setFormData] = useState({
    rating: 0,
    feedback: "",
  });
  const [formEditData, setFormEditData] = useState({
    rating: 0,
    feedback: "",
  });

  const userId = user ? user.id : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setFormEditData({ ...formEditData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!authenticated) {
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      showError("Vui lòng chọn số sao đánh giá");
      return;
    }
    try {
      const newReview = {
        ...formData,
        bookId: bookId,
        userId: userId,
      };
      await addReview(newReview);
      setFormData({ feedback: "", rating: 0 });
      fetchBookDetail();
    } catch (error) {
      console.error("Error adding review:", error);
    }
    setEditingReviewId(null);
  };

  const validateForm = () => {
    return formData.rating > 0 || formEditData.rating > 0;
  };
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      showError("Vui lòng chọn số sao đánh giá");
      return;
    }
    try {
      const updatedReview = {
        ...formEditData,
        bookId: bookId,
        userId: userId,
      };
      await updateReview(editingReviewId, updatedReview);
      setFormEditData({ feedback: "", rating: 0 });
      fetchBookDetail();
    } catch (error) {
      console.error("Error updating review:", error);
    }
    setEditingReviewId(null);
  };
  const toggleExpand = (reviewId) => {
    setExpanded((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const renderDropdown = (reviewId) => (
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        id={`dropdown-${reviewId}`}
        style={{ fontSize: "small", color: "#000" }}
      >
        <i className="bi bi-three-dots"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleEdit(reviewId)}>Sửa</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(reviewId)}>
          Xóa
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const handleEdit = (reviewId) => {
    setEditingReviewId(reviewId);
    const reviewToEdit = reviews.find((review) => review.id === reviewId);
    setFormEditData({
      rating: reviewToEdit.rating,
      feedback: reviewToEdit.feedback,
    });
  };

  const handleCancel = () => {
    setEditingReviewId(null);
  };

  const handleDelete = async (reviewId) => {
    const isConfirmed = window.confirm(
      "Bạn có muốn xóa đánh giá này không?"
    );
    if (isConfirmed) {
      try {
        await deleteReview(reviewId);
        fetchBookDetail();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <Notification />
      {!librarian && (
        <>
          <h6 style={{ marginBottom: "20px" }}>Viết đánh giá</h6>
          <Form onSubmit={handleSubmit}>
            <TextArea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Viết feedback của bạn..."
              rows={6}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Form.Group>
                <Rating
                  initialRating={formData.rating}
                  onChange={(value) =>
                    setFormData({ ...formData, rating: value })
                  }
                  fullSymbol={
                    <BsStarFill style={{ color: "gold", marginRight: "5px" }} />
                  }
                  emptySymbol={
                    <BsStar
                      style={{ color: "lightgray", marginRight: "5px" }}
                    />
                  }
                  halfSymbol={
                    <BsStarHalf style={{ color: "gold", marginRight: "5px" }} />
                  }
                />
              </Form.Group>
              <Button
                type="submit"
                style={{
                  fontSize: "small",
                  backgroundColor: "#F87555",
                  border: "none",
                }}
              >
                Gửi
              </Button>
            </div>
          </Form>
        </>
      )}

      <h6 style={{ margin: "20px 0" }}>Đánh giá ({totalReviews})</h6>
      {reviews && reviews.length > 0 ? (
        <ListGroup>
          {reviews.map((review) => (
            <ListGroup.Item
              key={review.id}
              style={{ border: "none", padding: "0", margin: "10px 0" }}
            >
              <div style={{ marginBottom: "10px" }}>
                <div                      
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <span
                      style={{
                        marginRight: "10px",
                        fontSize: "small",
                        fontWeight: "bold",
                      }}
                    >
                      {review.memberName}
                    </span>
                    {editingReviewId === review.id ? (
                      <Rating
                        initialRating={formEditData.rating}
                        onChange={(value) =>
                          setFormEditData({ ...formEditData, rating: value })
                        }
                        fullSymbol={
                          <BsStarFill
                            style={{ color: "gold", marginRight: "5px" }}
                          />
                        }
                        emptySymbol={
                          <BsStar
                            style={{ color: "lightgray", marginRight: "5px" }}
                          />
                        }
                        halfSymbol={
                          <BsStarHalf
                            style={{ color: "gold", marginRight: "5px" }}
                          />
                        }
                      />
                    ) : (
                      <Rating
                        initialRating={review.rating}
                        readonly
                        fullSymbol={
                          <BsStarFill
                            style={{ color: "gold", marginRight: "3px" }}
                          />
                        }
                        emptySymbol={
                          <BsStar
                            style={{ color: "lightgray", marginRight: "3px" }}
                          />
                        }
                        halfSymbol={
                          <BsStarHalf
                            style={{ color: "gold", marginRight: "3px" }}
                          />
                        }
                      />
                    )}
                    <div style={{ fontSize: "small", color: "#555" }}>
                      {review.updatedAt}
                    </div>
                  </div>
                  {userId === review.memberId && (
                    <div
                      style={{
                        fontSize: "small",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {editingReviewId === review.id ? (
                        <div>
                          <Button
                            onClick={handleCancel}
                            style={{
                              fontSize: "small",
                              backgroundColor: "transparent",
                              border: "1px solid #ABABAB",
                              marginLeft: "10px",
                              color: "#ABABAB",
                            }}
                          >
                            Hủy
                          </Button>
                          <Button
                            onClick={handleEditSubmit}
                            style={{
                              fontSize: "small",
                              backgroundColor: "#F87555",
                              border: "none",
                              marginLeft: "10px",
                            }}
                          >
                            Lưu
                          </Button>
                        </div>
                      ) : (
                        renderDropdown(review.id)
                      )}
                    </div>
                  )}
                </div>
              </div>
              <p style={{ textAlign: "justify", fontSize: "small" }}>
                {editingReviewId === review.id ? (
                  <TextArea
                    name="feedback"
                    value={formEditData.feedback}
                    onChange={handleEditChange}
                    placeholder="Viết feedback của bạn..."
                    rows={6}
                  />
                ) : expanded[review.id] ? (
                  review.feedback
                ) : review.feedback.length > 200 ? (
                  <>
                    {`${review.feedback.substring(0, 200)}...`}
                    <Button
                      onClick={() => toggleExpand(review.id)}
                      variant="link"
                      style={{ padding: "0", marginLeft: "5px" }}
                    >
                      Xem thêm
                    </Button>
                  </>
                ) : (
                  review.feedback
                )}
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p style={{ textAlign: "justify", fontSize: "small" }}>
          Không có đánh giá nào.
        </p>
      )}
    </div>
  );
};

export default ReviewsTab;
