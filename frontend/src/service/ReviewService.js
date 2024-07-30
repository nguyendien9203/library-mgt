import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/review";

const getHeader = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const getReviewsByBookId = async (bookId) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-all-review/${bookId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addReview = async (reviewData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-review`, reviewData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteReview = async (reviewId) => {
    try {        
        const response = await axios.delete(`${BASE_URL}/delete-review/${reviewId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

export const updateReview = async (reviewId, reviewData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update-review/${reviewId}`, reviewData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }

};

// export const getAllReviews = async () => {
//     try {
//         const response = await axios.get(`${BASE_URL}/get-all-review`, {
//             headers: getHeader()
//         });
//         return response.data;
//     } catch (error) {
//         throw error;
//     }

// };
