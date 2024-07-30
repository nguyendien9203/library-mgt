import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/rent";

const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};


export const getLoansByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/getRentsByUserId?userId=${userId}`, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoansWithPendingStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllRentWithPendingState`, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoansWithRejectStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllRentWithRejectState`, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoansWithReturningStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllRentWithReturningState`, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoansByUserIdAndStatus = async (userId, status) => {
  try {
    const response = await axios.get(`${BASE_URL}/getLoansByUserIdAndStatus`, {
      params: { userId, status },
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveLoan = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/approve`, body, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectLoan = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/reject`, body, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const returningLoan = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/returning`, body, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const returnLoan = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/return`, body, { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const requestRent = async (rentRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/`, rentRequest, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoanStatistic = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-loan-statistic`, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


