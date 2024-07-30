import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../../assets/style/Style.css';
import Notification from '../../common/Notification';
import useNotification from '../../../hooks/useNotification';
import { addCategory, getParentCategories } from '../../../service/CategoryService';
import { useAuth } from '../../context/AuthContext';
import TextInput from '../../common/TextInput';
import CustomSelect from '../../common/CustomSelect';

const AddCategory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showError, showSuccess } = useNotification();
  const [submitting, setSubmitting] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getParentCategories();

        console.log("Parent categories data: ", categoriesData);
        if (categoriesData.status === 200) {
          setParentCategories(categoriesData.data);
        } else {
          showError('Không thể lấy danh mục cha');
        }
      }
      catch (error) {
        console.error("Lỗi khi lấy danh mục cha:", error);
        showError('Lỗi khi lấy danh mục cha');
      }
    };

    fetchData();
  }, []);

  console.log("Parent categories: ", parentCategories);

  const [formData, setFormData] = useState({
    userId: user.id,
    name: '',
    parentId: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  console.log("formData: ", formData);

  const validateForm = () => {
    const { name } = formData;
    if (!name) {
      return false;
    }
    return true;
  }

  const handleBlur = (e) => {
    if (!validateForm()) {
      showError('Vui lòng nhập tên danh mục');
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showError('Vui lòng nhập tên danh mục');
      return;
    }

    setSubmitting(true);
    const timer = new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response = await addCategory(formData);
      await timer;

      if (response.status === 201) {
        showSuccess(response.message);
        setFormData({
          user: user.id,
          name: '',
          parentId: ''
        });

        navigate('/admin/category', { state: { success: response.message } });
      } else {
        showError(response.message);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      showError('Thêm danh mục thất bại');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ margin: '0 200px' }}>
      <Notification />
      <div style={{ marginBottom: '20px' }}>
        <h5>Thêm danh mục</h5>
      </div>
      <Form onSubmit={handleSubmit}>
        <TextInput
          label="Tên danh mục"
          name="name"
          type="text"
          placeholder="Nhập tên danh mục"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <Form.Group className="mb-3">
          <Form.Label className="label">Danh mục cha</Form.Label>
          <CustomSelect
            label="Danh mục cha"
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Chọn danh mục cha"
            data={parentCategories}
            valueType="id"
          />
        </Form.Group>



        <Button
          type='submit'
          style={{ fontSize: 'small', backgroundColor: '#F87555', border: 'none' }}
          disabled={submitting}
        >
          {submitting ? <Spinner animation="border" size="sm" /> : "Lưu thay đổi"}
        </Button>
      </Form>
    </div>
  );
};

export default AddCategory;
