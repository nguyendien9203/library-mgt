import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/user";

const getHeader = () => {
    const token = localStorage.getItem("access_token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

export const getUsersByRole = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/list-user-by-role`, {
            headers: getHeader()
        });
        console.log("response user", response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/get-user-by-id/${id}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/add-user`, userData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${BASE_URL}/update-user/${id}`, userData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserChart = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get-user-chart`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

