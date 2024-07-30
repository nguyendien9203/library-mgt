import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/author";
const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
      Authorization: `Bearer ${token}` ,
      "Content-Type": "application/json"
  };
};


export const getAuthors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-author`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAuthor = async (authorData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-author`, authorData, { 
      headers: getHeader() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAuthor = async (id, authorData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-author/${id}`, authorData, { 
      headers: getHeader() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-author/${id}`, { 
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
     throw error; 
  }
};

export const getAuthorById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-author-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
