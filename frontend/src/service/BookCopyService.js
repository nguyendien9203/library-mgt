import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/book-copy";

const getHeader = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

export const addBookCopy = async (bookCopyData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-book-copy`, bookCopyData, {
            headers: getHeader()
        });
        console.log("Response: ", response);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBookCopy = async (bookCopyId, bookCopyData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${bookCopyId}/update-book-copy`, bookCopyData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteBookCopy = async (bookCopyId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${bookCopyId}/delete-book-copy`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBookCopyById = async (bookCopyId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${bookCopyId}/get-book-copy-by-id`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllBookCopy = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-all-book-copy`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}