import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/style/Style.css";
import Notification from "../../common/Notification";
import useNotification from "../../../hooks/useNotification";
import { updateCategory, getCategoryById, getParentCategories } from "../../../service/CategoryService";
import { useAuth } from "../../context/AuthContext";
import TextInput from "../../common/TextInput";
import CustomSelect from "../../common/CustomSelect";

const EditCategory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { showError } = useNotification();
  const [submitting, setSubmitting] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);

  const [formData, setFormData] = useState({
    userId: user.id,
    name: "",
    parentId: ""
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryById(id);
        if (category.status === 200) {
          setFormData({
            userId: user.id,
            name: category.data.name,
            parentId: category.data.parentId !== undefined ? category.data.parentId : null        
          });
        } else {
          showError(category.message);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData(prevState => ({
      ...prevState,
      [name]: value === undefined ? "" : value,
    }));
  };

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
      showError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setSubmitting(true);
    const timer = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await updateCategory(id, formData);
      await timer;

      if (response.status === 200) {
        navigate("/admin/category", { state: { success: response.message } });
      } else {
        showError(response.message);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setSubmitting(false);
    }
  }



  return (
    <div style={{ margin: "0 200px" }}>
      <Notification />
      <div style={{ marginBottom: "20px" }}>
        <h5>Cập nhật danh mục</h5>
      </div>
      <Form onSubmit={handleSubmit}>

        <TextInput
          label="Danh mục"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Nhập tên danh mục"
          type="text"
        />

        <Form.Group className="mb-3">
          <Form.Label className="label">Danh mục cha</Form.Label>
          <CustomSelect
            label="Danh mục cha"
            name="parentId"
            value={formData.parentId === 0 ? "" : formData.parentId}
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

export default EditCategory;
