import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuthors, deleteAuthor } from '../../../service/AuthorService';
import Notification from '../../common/Notification';
import useNotification from '../../../hooks/useNotification';
import CustomModal from '../../common/CustomModal';
import '../../../assets/style/Author.css';


const Author = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authors, setAuthors] = useState([]);
  const { showSuccess, showError } = useNotification();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);
  const [submittingDelete, setSubmittingDelete] = useState(false);

  useEffect(() => {
    if (location.state && location.state.success) {
      showSuccess(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showSuccess, navigate]);


  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await getAuthors();
        if (response.status === 200) {
          setAuthors(response.data); 
        } else {
          showError('Không thể lấy tác giả');
        }
      } catch (error) {
        console.error("Lỗi khi lấy tác giả:", error);
        showError('Lỗi khi lấy tác giả');
      } 
    };

    fetchAuthors();
  }, []);

  console.log("Authors: ", authors);

  const handleShowDeleteModal = (author) => {
    setAuthorToDelete(author);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setAuthorToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteAuthor = async () => {
    if (!authorToDelete) return;

    setSubmittingDelete(true);
    const timer = new Promise(resolve => setTimeout(resolve, 2000));
    

    try {
      const response = await deleteAuthor(authorToDelete.id);
      await timer;

      if (response.status === 200) {
        showSuccess('Xóa tác giả thành công');
        setAuthors(authors.filter(author => author.id !== authorToDelete.id));
      } else {
        showError('Không thể xóa tác giả');
      }
    } catch (error) {
      console.error("Lỗi khi xóa tác giả:", error);
      showError('Lỗi khi xóa tác giả');
    } finally {
      setSubmittingDelete(false);
      handleCloseDeleteModal();
    }
  };
  
  return (
    <div>
      <Notification />
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Tác giả</h5>
        <Link
          className="btn btn-primary"
          to="/admin/author/add"
          style={{
            fontSize: 'small',
            backgroundColor: '#F87555',
            border: 'none',
          }}
        >
          <i className="bi bi-plus-lg"></i>
          <span className="m-1">Thêm</span>
        </Link>
      </div>
      {authors.length > 0 ? (
        <Table style={{ fontSize: 'small', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <thead>
          <tr>
            <th>Tác giả</th>
            <th className="description-column">Mô tả</th>
            <th>Thời gian sửa đổi</th>
            <th>Người sửa đổi</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td className="align-middle">{author.name}</td>
              <td className="align-middle description-column">{author.description}</td>
              <td className="align-middle">{author.updatedAt}</td>
              <td className="align-middle">{author.updatedBy}</td>
              <td className="align-middle">
                <Button
                  as={Link}
                  to={`/admin/author/edit/${author.id}`}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    padding: '0'
                  }}
                >
                  <i className="bi bi-pen"></i>
                  <span className='m-1'>Sửa</span>
                </Button>
                <Button
                  as={Button}
                  style={{
                    fontSize: 'small',
                    backgroundColor: '#fff',
                    border: 'none',
                    color: '#000',
                    padding: '0',
                    marginLeft: '5px'
                  }}
                  onClick={() => handleShowDeleteModal(author)}
                >
                  <i className="bi bi-trash3"></i>
                  <span className='m-1'>Xóa</span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>) : (
        <p>Không có tác giả nào được tìm thấy</p>
      )}

      <CustomModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        title="Xác nhận xóa tác giả"
        handleSave={handleDeleteAuthor}
        submitting={submittingDelete}
        hasFooter={true}
      >
        <p>Bạn có chắc chắn muốn xóa danh mục <strong>{authorToDelete?.name}</strong> không?</p>
      </CustomModal>

    </div>
  );
};

export default Author;
