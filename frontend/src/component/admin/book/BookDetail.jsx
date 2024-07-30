import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap';
import BookCard from '../../common/BookCard';
import BookDetailCard from '../../common/BookDetailCard';
import BookDetailTabs from '../../common/BookDetailTabs';
import Notification from '../../common/Notification';
import useNotification from '../../../hooks/useNotification.js';
import { getBookById, getBookByIdAuth, getBookImage, getBookSampleImages } from '../../../service/BookService';
import JSZip from 'jszip';

const BookDetail = () => {
    const { id } = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const { showError } = useNotification();


    const fetchBookDetail = async () => {
        try {
            const tmp = localStorage.getItem('access_token');
            console.log('tmp', tmp);
            const response =  tmp ? await getBookByIdAuth(id) : await getBookById(id);
            if (response.status === 200) {
                const book = response.data;

                try {
                    const imageResponse = await getBookImage(id);
                    if (imageResponse.status === 200) {
                        const contentDisposition = imageResponse.headers['content-disposition'];
                        let fileName = 'unknown';
                        if (contentDisposition) {
                            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                            if (fileNameMatch && fileNameMatch.length === 2) {
                                fileName = fileNameMatch[1];
                            }
                        }

                        const file = new File([imageResponse.data], fileName, { type: imageResponse.data.type });
                        const imageUrl = URL.createObjectURL(file);

                        setBookDetail(prevBookDetail => ({
                            ...prevBookDetail,
                            ...book,
                            imageUrl,
                        }));
                    } else {
                        showError(imageResponse.message);
                        setBookDetail(prevBookDetail => ({
                            ...prevBookDetail,
                            ...book,
                            imageUrl: null,
                        }));
                    }
                } catch (error) {
                    console.error("Lỗi lấy ảnh sách:", error);
                    setBookDetail(prevBookDetail => ({
                        ...prevBookDetail,
                        ...book,
                        imageUrl: null,
                    }));
                }

                try {
                    const sampleImagesResponse = await getBookSampleImages(id);
                    if (sampleImagesResponse.status === 200) {
                        const contentDisposition = sampleImagesResponse.headers['content-disposition'];
                        let zipFileName = 'unknown';
                        if (contentDisposition) {
                            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                            if (fileNameMatch && fileNameMatch.length === 2) {
                                zipFileName = fileNameMatch[1];
                            }
                        }

                        const sampleImagesBlob = new File([sampleImagesResponse.data], zipFileName, { type: sampleImagesResponse.data.type });
                        console.log("sampleImagesBlob: ", sampleImagesBlob);
                        const zip = new JSZip();

                        // Handle the zip file asynchronously
                        zip.loadAsync(sampleImagesBlob).then(async (zip) => {
                            const imageUrls = [];
                            await Promise.all(Object.keys(zip.files).map(async (filename) => {
                                const fileData = await zip.file(filename).async('blob');
                                const imageUrl = URL.createObjectURL(fileData);
                                imageUrls.push({ url: imageUrl, name: filename });
                            }));

                            setBookDetail(prevBookDetail => ({
                                ...prevBookDetail,
                                ...book,
                                sampleBookImages: imageUrls,
                            }));
                        }).catch((error) => {
                            console.error("Lỗi giải nén file zip:", error);
                            showError("Lỗi giải nén file zip");
                            setBookDetail(prevBookDetail => ({
                                ...prevBookDetail,
                                ...book,
                                sampleBookImages: [],
                            }));
                        });
                    } else {
                        showError(sampleImagesResponse.message);
                        setBookDetail(prevBookDetail => ({
                            ...prevBookDetail,
                            ...book,
                            sampleBookImages: [],
                        }));
                    }
                } catch (error) {
                    console.error("Lỗi lấy ảnh mẫu sách:", error);
                    setBookDetail(prevBookDetail => ({
                        ...prevBookDetail,
                        ...book,
                        sampleBookImages: [],
                    }));
                }

            } else {
                showError(response.message);
            }
        } catch (error) {
            console.error("Error fetching book:", error);
        }
    };



    useEffect(() => {
        fetchBookDetail();
    }, [id, localStorage.getItem('access_token')]);

    console.log("Book Detail: ", bookDetail);

    return (
        <div style={{ margin: '0 200px' }}>
            <Notification />
            <div style={{ marginBottom: '20px' }}>
                <h5>Chi tiết sách</h5>
            </div>
            <div style={{ padding: '0 16px 0 16px', marginBottom: '16px', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                <Row style={{ backgroundColor: '#fff', marginBottom: '20px' }}>
                    <Col md={4} style={{ display: 'flex', padding: '0' }}>
                        <BookCard
                            imageUrl={bookDetail.imageUrl ? bookDetail.imageUrl : 'https://via.placeholder.com/300x400'}
                            mode="imageShow"
                            cardWidth="18rem"
                            cardPadding="16px"
                        />
                    </Col>
                    <Col md={8} style={{ display: 'flex', padding: '0' }}>
                        <BookDetailCard bookDetail={bookDetail} />
                    </Col>
                </Row>

                <Row style={{ backgroundColor: '#fff' }}>
                    <Col>
                        <BookDetailTabs bookDetail={bookDetail} fetchBookDetail={fetchBookDetail} />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default BookDetail