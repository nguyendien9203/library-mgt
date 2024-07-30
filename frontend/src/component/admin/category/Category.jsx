import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory, getCategoryById } from '../../../service/CategoryService';
import Notification from '../../common/Notification';
import useNotification from '../../../hooks/useNotification';
import CustomModal from '../../common/CustomModal';

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const { showSuccess, showError } = useNotification();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [submittingDelete, setSubmittingDelete] = useState(false);

  useEffect(() => {
    if (location.state && location.state.success) {
      showSuccess(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, showSuccess, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();

        console.log("Categories data: ", categoriesData);
        if (categoriesData.status === 200) {
          setCategories(categoriesData.data);
        } else {
          showError('Không thể lấy danh mục');
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        showError('Lỗi khi lấy danh mục');
      }
    };

    fetchData();
  }, []);

  console.log("Categories: ", categories);

  const handleShowDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setCategoryToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    setSubmittingDelete(true);
    const timer = new Promise(resolve => setTimeout(resolve, 2000));


    try {
      const response = await deleteCategory(categoryToDelete.id);
      await timer;

      if (response.status === 200) {
        showSuccess('Xóa danh mục thành công');
        setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
      } else {
        showError('Không thể xóa danh mục');
      }
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      showError('Lỗi khi xóa danh mục');
    } finally {
      setSubmittingDelete(false);
      handleCloseDeleteModal();
    }
  };

  const getParentCategoryName = async (parentId) => {
    try {
      const parentCategory = await getCategoryById(parentId);
      return parentCategory.name;
    } catch (error) {
      console.error("Lỗi khi lấy danh mục cha:", error);
      return 'Không có';
    }
  };

  return (
    <div>
      <Notification />
      <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
        <h5>Danh mục</h5>
        <Link
          className="btn btn-primary"
          to="/admin/category/add"
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
      {categories.length > 0 ? (
        <Table style={{ fontSize: 'small', boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          <thead>
            <tr>
              <th>Danh mục</th>
              <th>Danh mục cha</th>
              <th>Thời gian sửa đổi</th>
              <th>Người sửa đổi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="align-middle">{category.name}</td>
                <td className="align-middle">{category.parentName}</td>
                <td className="align-middle">{category.updatedAt}</td>
                <td className="align-middle">{category.updatedBy}</td>
                <td className="align-middle">
                  <Button
                    as={Link}
                    to={`/admin/category/edit/${category.id}`}
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
                    onClick={() => handleShowDeleteModal(category)}
                    style={{
                      fontSize: 'small',
                      backgroundColor: '#fff',
                      border: 'none',
                      color: '#000',
                      padding: '0',
                      marginLeft: '5px'
                    }}
                  >
                    <i className="bi bi-trash3"></i>
                    <span className='m-1'>Xóa</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Không có danh mục nào được tìm thấy</p>
      )}

      <CustomModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        title="Xác nhận xóa danh mục"
        handleSave={handleDeleteCategory}
        submitting={submittingDelete}
        hasFooter={true}
      >
        <p>Bạn có chắc chắn muốn xóa danh mục <strong>{categoryToDelete?.name}</strong> không?</p>
      </CustomModal>
    </div>
  );
};

export default Category;
