import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/book";

const getHeader = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`
    };
};

export const addBook = async (bookData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-book`, bookData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBook = async (bookId, bookData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${bookId}/update-book`, bookData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBook = async (bookId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${bookId}/delete-book`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadBookImage = async (bookId, bookImage) => {
    try {
        const formData = new FormData();
        formData.append("file", bookImage);

        const response = await axios.post(`${BASE_URL}/${bookId}/upload-book-image`, formData, {
            headers: {
                ...getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const uploadBookSampleImages = async (bookId, bookSampleImages) => {
    try {
        const formData = new FormData();
        bookSampleImages.forEach((image) => {
            formData.append("files", image);
        });

        const response = await axios.post(`${BASE_URL}/${bookId}/upload-sample-book-images`, formData, {
            headers: {
                ...getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBooks = async (pageNo, pageSize, search, categoryId, status) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-books`, {
            params: {
                pageNo,
                pageSize,
                search: search || undefined,
                categoryId: categoryId || undefined,
                status: status || undefined
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBookById = async (bookId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${bookId}/get-book-by-id`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBookByIdAuth = async (bookId) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-book-by-id-auth?bookId=${bookId}`, {headers: getHeader()});
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBookImage = async (bookId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${bookId}/get-book-image`, {
            responseType: 'blob'
        });
        console.log("response", response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getBookSampleImages = async (bookId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${bookId}/get-sample-book-images`, {
            responseType: 'blob'
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getNewestBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-newest-books`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllBooksBySubCategory = async (parentCategoryId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${parentCategoryId}/get-all-books-by-sub-category`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBooksByCategory = async (subCategoryId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${subCategoryId}/get-books-by-category-id`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}



