import React from 'react';
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import CopiesTab from './CopiesTab';
import AuthorsTab from './AuthorsTab';
import ReviewsTab from './ReviewsTab';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';


const BookDetailTabs = ({ bookDetail, fetchBookDetail }) => {
    const { isUserAuthenticated } = useAuth();
    const [authenticated, setAuthenticated] = useState(isUserAuthenticated);

    useEffect(() => {
        setAuthenticated(isUserAuthenticated);
    }, [isUserAuthenticated]);

    // // Phuc lam 
    // const [reviews, setReviews] = useState([]);

    // const bookId = bookDetail.id;
    // useEffect(() => {
    //     const fetchReviews = async () => {
    //         try {
    //             const response = await getReviewsByBookId(bookId);
    //             setReviews(response);
    //         } catch (error) {
    //             console.error("Lỗi lấy đánh giá:", error);
    //         }
    //     };
    //     fetchReviews();
    // }, []);

    // console.log(reviews);
    return (
        <div style={{ height: '100%' }}>
            <Tab.Container id="book-detail-tabs" defaultActiveKey={authenticated ? "copies" : "authors"}>
                <Row>
                    <Col md={12}>
                        <Nav variant="tabs" className="justify-content-center">
                            {authenticated &&
                                <Nav.Item>
                                    <Nav.Link eventKey="copies" style={{ fontSize: 'small', color: '#000' }}>Các bản sao</Nav.Link>
                                </Nav.Item>
                            }
                            <Nav.Item>
                                <Nav.Link eventKey="authors" style={{ fontSize: 'small', color: '#000' }}>Tác giả</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reviews" style={{ fontSize: 'small', color: '#000' }}>Đánh giá</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>

                <Row>
                    <Col md={12} style={{ height: '100%' }}>
                        <Tab.Content style={{ height: '100%' }}>
                            {authenticated &&
                                <Tab.Pane eventKey="copies" style={{ height: '100%' }}>
                                    <CopiesTab bookId={bookDetail.id} bookCopies={bookDetail.bookCopies} fetchBookDetail={fetchBookDetail} />
                                </Tab.Pane>
                            }
                            <Tab.Pane eventKey="authors" style={{ height: '100%' }}>
                                <AuthorsTab authors={bookDetail.authors} fetchBookDetail={fetchBookDetail} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="reviews" style={{ height: '100%' }}>
                                <ReviewsTab bookId={bookDetail.id} reviews={bookDetail.reviews} fetchBookDetail={fetchBookDetail} totalReviews={bookDetail.totalReviews} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default BookDetailTabs;
