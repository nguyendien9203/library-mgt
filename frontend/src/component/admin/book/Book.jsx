import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Table, Image, Button } from 'react-bootstrap';
import Notification from '../../common/Notification';
import useNotification from '../../../hooks/useNotification.js';
import SelectSearchForm from '../../common/SelectSearchForm';
import PaginationComponent from '../../common/PaginationComponent.jsx';
import CustomModal from '../../common/CustomModal.jsx';
import { getCategories } from '../../../service/CategoryService.js';
import { getBooks, getBookImage, deleteBook } from '../../../service/BookService.js';

const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showError, showSuccess } = useNotification();
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(5);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [submittingDelete, setSubmittingDelete] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.status === 200) {
          const filteredCategories = response.data.filter(category => category.parentId !== 0);
          setCategories(filteredCategories);
        } else {
          showError(response.message);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        showError('Lỗi khi lấy danh mục');
      }
    };

    fetchCategories();
  }, []);

  const handlePageChange = (page) => {
    setPageNo(page);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (searchText) => {
    setSearchText(searchText);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks(pageNo, pageSize, searchText, selectedCategory, null);
        if (response.status == 200) {
          const booksWithImages = await Promise.all(response.data.items.map(async (book) => {
            try {
              const imageResponse = await getBookImage(book.id);
              if (imageResponse.status === 200) {

                const contentDisposition = imageResponse.headers['content-disposition'];
                console.log('Content-Disposition:', contentDisposition);
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
                console.error('Lỗi khi lấy ảnh sách:', imageResponse.statusText);
                return { ...book, imageUrl: null };
              }
            } catch (error) {
              console.error('Lỗi khi xử lý ảnh sách:', error);
              return { ...book, imageUrl: null };
            }
          }));
          setBooks(booksWithImages);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sách:', error);
        showError('Lỗi khi lấy danh sách sách');
      }
    };

    fetchBooks();
  }, [pageNo, pageSize, searchText, selectedCategory]);

  useEffect(() => {
    if (location.state && location.state.success) {
      showSuccess(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showSuccess, navigate]);

  const renderAuthors = (authors) => {
    return authors.map(author => author.name).join(', ');
  };

  const handleShowDeleteModal = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setBookToDelete(null);
    setShowDeleteModal(false);
  }

  const handleDeleteBook = async () => {
    if (!bookToDelete) return;

    setSubmittingDelete(true);
    const timer = new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response = await deleteBook(bookToDelete.id);
      await timer;

      if (response.status === 200) {
        showSuccess('Xóa sách thành công');
        setBooks(books.filter(book => book.id !== bookToDelete.id));
      } else {
        showError('Không thể xóa sách');
      }
    } catch (error) {
      console.error("Lỗi khi xóa sách:", error);
      showError('Lỗi khi xóa sách');
    } finally {
      setSubmittingDelete(false);
      setBookToDelete(null);
      setShowDeleteModal(false);
    }
  }

  console.log("Books: ", books);


  return (
    <div>
      <Notification />
      <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
        <h5>Sách</h5>
        <div className='d-flex'>
          <SelectSearchForm
            options={categories}
            onSelectChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
          />
          <Link
            className="btn btn-primary"
            to="/admin/book/add"
            style={{
              fontSize: 'small',
              backgroundColor: '#F87555',
              border: 'none',
              marginLeft: '10px'
            }}
          >
            <i className="bi bi-plus-lg"></i>
            <span className="m-2">Thêm</span>
          </Link>
        </div>
      </div>
      {books.length > 0 ? (
        <div>
          <Table style={{ fontSize: 'small', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Thời gian sửa đổi</th>
                <th>Người sửa đổi</th>
                <th>Đánh giá</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <Image
                        src={book.imageUrl ? book.imageUrl : 'https://via.placeholder.com/70'}
                        alt={book.title}
                        style={{ width: '70px', height: 'auto', marginRight: '20px' }}
                      />

                      <div style={{ width: '300px' }}>
                        {book.title}
                        <div style={{ fontSize: 'x-small' }}>{renderAuthors(book.authors)}, {book.publicationYear}</div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">{book.updatedAt}</td>
                  <td className="align-middle">{book.updatedBy}</td>
                  <td className="align-middle">{book.rating}/5.0</td>
                  <td className="align-middle">
                    {book.categories.map((category, index) => (
                      <div key={index}>
                        {category.name}
                        {category.parentName && (
                          <div style={{ fontSize: 'x-small' }}>{category.parentName}</div>
                        )}
                      </div>
                    ))}
                  </td>
                  <td className="align-middle">{book.status}</td>
                  <td className="align-middle">
                    <Button
                      as={Link}
                      to={`/admin/book/detail/${book.id}`}
                      style={{
                        fontSize: 'small',
                        backgroundColor: '#fff',
                        border: 'none',
                        color: '#000',
                        padding: '0'
                      }}
                    >
                      <i className="bi bi-journal-bookmark"></i>
                      <span className='m-1'>Chi tiết</span>
                    </Button>
                    <Button
                      as={Link}
                      to={`/admin/book/edit/${book.id}`}
                      style={{
                        fontSize: 'small',
                        backgroundColor: '#fff',
                        border: 'none',
                        color: '#000',
                        padding: '0',
                        margin: '0 5px'
                      }}
                    >
                      <i className="bi bi-pencil-square"></i>
                      <span className='m-1'>Sửa</span>
                    </Button>
                    <Button
                      as={Button}
                      style={{
                        fontSize: 'small',
                        backgroundColor: '#fff',
                        border: 'none',
                        color: '#000',
                        padding: '0'
                      }}
                      onClick={() => handleShowDeleteModal(book)}
                    >
                      <i className="bi bi-trash3"></i>
                      <span className='m-1'>Xóa</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationComponent pageNo={pageNo} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      ) : (
        <p className="mt-4">Không có sách nào được tìm thấy</p>
      )}

      <CustomModal
        title="Xác nhận xóa sách"
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleSave={handleDeleteBook}
        submitting={submittingDelete}
        hasFooter={true}
      >
        <p>Bạn có chắc chắn muốn xóa sách <strong>{bookToDelete?.title}</strong> không?</p>
      </CustomModal>

    </div>
  );
};

export default Book;