import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/category";

const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getParentCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-parent-category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-category`, categoryData, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-category/${id}`, categoryData, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-category/${id}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-category-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
