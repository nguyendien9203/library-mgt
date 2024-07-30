import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/style/Style.css";
import Notification from "../../common/Notification";
import useNotification from "../../../hooks/useNotification";
import { updateAuthor, getAuthorById } from "../../../service/AuthorService";
import { useAuth } from "../../context/AuthContext";
import TextInput from "../../common/TextInput";
import TextArea from '../../common/TextArea';

const EditAuthor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const { showError } = useNotification();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    userId: user.id,
    name: "",
    description: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const author = await getAuthorById(id);
        if (author.status === 200) {
          setFormData(author.data);
        } else {
          showError(author.message);
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("formData: ", formData);

  const validateForm = () => {
    const { name} = formData;
    if (!name) {
      return false;
    }
    return true;
  }

  const handleBlur = (e) => {
    if (!validateForm()) {
      showError('Vui lòng điền tên tác giả');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showError('Vui lòng điền tên tác giả');
      return;
    }

    setSubmitting(true);
    const timer = new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const response = await updateAuthor(id, formData);
      await timer;

      if (response.status === 200) {
        navigate('/admin/author', { state: { success: response.message } });
      } else {
        showError(response.message);
      }
    } catch (error) {
      console.error("Error updating author:", error);
      showError('Lỗi cập nhật tác giả');
    } finally {
      setSubmitting(false);
    }
  }


  return (
    <div style={{ margin: '0 200px' }}>
      <Notification />
      <div style={{ marginBottom: '20px' }}>
        <h5 >Cập nhật tác giả</h5>
      </div>
      <Form onSubmit={handleSubmit}>
        <TextInput
          label="Tên tác giả"
          name="name"
          type="text"
          placeholder="Nhập tên tác giả"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <TextArea
          label="Mô tả"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Nhập mô tả"
        />

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

export default EditAuthor;