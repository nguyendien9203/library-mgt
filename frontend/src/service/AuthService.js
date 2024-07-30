import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/auth";
const getHeader = () => {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
  };
export const login = async (loginData) => {
    try {
        const response = await axios.post(`${BASE_URL}/authenticate`, loginData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const register = async (registerData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, registerData);
        console.log("response", response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const sendOtp = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/send-otp`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const verify = async (email, otp) => {
    try {
        const response = await axios.post(`${BASE_URL}/verify`, { email, otp });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const resend = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/resend-otp`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getWhoami = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/whoami`, { headers: getHeader() });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const resetPassword = async (otp, email, newPassword) => {
    try {
        const response = await axios.post(`${BASE_URL}/reset-password`, { otp, email, newPassword });
        console.log("Request body:", { otp, email, newPassword });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const oAuth2Login = async (tokenId) => {
    try {
        const response = await axios.get(`${BASE_URL}/google`, { tokenId });
        console.log("response", response);
        return response.data;
    } catch (error) {
        throw error;
    }
}



