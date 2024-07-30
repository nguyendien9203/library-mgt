import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import '../../../assets/style/Home.css';
import { getNewestBooks, getBookImage, getAllBooksBySubCategory } from '../../../service/BookService';
import BookCardList from '../../common/BookCardList';
import useNotification from '../../../hooks/useNotification';
import Notification from '../../common/Notification';


const Home = () => {
  const [newestBooks, setNewestBooks] = useState([]);
  const [subCategoryBooks, setSubCategoryBooks] = useState([]);

  useEffect(() => {
    const fetchNewestBooks = async () => {
      try {
        const response = await getNewestBooks();
        if (response.status === 200) {

          const newestBookWithImage = await Promise.all(response.data.map(async book => {
            const imageResponse = await getBookImage(book.id);
            if (imageResponse.status === 200) {
              const contentDisposition = imageResponse.headers['content-disposition'];
              let fileName = 'unknown';
              if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2) {
                  fileName = fileNameMatch[1];
                }
              }
              const file = new File([imageResponse.data], fileName, { type: imageResponse.data.type });
              const imageUrl = URL.createObjectURL(file);
              return { ...book, imageUrl };
            } else {
              return { ...book, imageUrl: null };
            }
          }));

          setNewestBooks(newestBookWithImage);


        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sách mới nhất:", error);
      }
    };

    fetchNewestBooks();
  }, []);

  useEffect(() => {
    const fetchSubCategoryBooks = async () => {
      try {
        const response = await getAllBooksBySubCategory(0);

        if (response.status === 200) {
          const subCategoryBooksWithImage = await Promise.all(
            response.data.map(async subCategoryBook => {
              const booksWithImage = await Promise.all(
                subCategoryBook.books.map(async book => {
                  const imageResponse = await getBookImage(book.id);
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
                    return { ...book, imageUrl };
                  } else {
                    return { ...book, imageUrl: null };
                  }
                })
              );

              if (booksWithImage.length > 0) {
                return { ...subCategoryBook, books: booksWithImage };
              } else {
                return null;
              }
            })
          );

          const filteredSubCategoryBooks = subCategoryBooksWithImage.filter(item => item !== null);

          setSubCategoryBooks(filteredSubCategoryBooks);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error("Lỗi khi lấy sách theo danh mục:", error);
      }
    };



    fetchSubCategoryBooks();
  }, []);

  console.log("Newest Books: ", newestBooks);
  console.log("Sub Category Books: ", subCategoryBooks);
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useNotification();
  useEffect(() => {
    if (location.state && location.state.success) {
      showSuccess(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showSuccess, navigate]);

  return (
    <>
      <Notification />
      <Row className='home-container'>
        <BookCardList title="Sách mới nhất" books={newestBooks} />

        {subCategoryBooks.map(subCategory => (
          <BookCardList key={subCategory.subCategoryName} title={subCategory.subCategoryName} books={subCategory.books} />
        ))}
      </Row>
    </>
  );
};

export default Home;