import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/membership";

const getHeader = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

export const getMemberships = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/memberships`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkUserSubscribed = async (userId, subscriptionId) => {
  try {
    const response = await axios.get(`${BASE_URL}/check-user-subscription` , {
      params: { userId, subscriptionId },
      headers: getHeader() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const isUserSubscribed = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/is-user-subscribed` , {
      params: { userId },
      headers: getHeader() 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const addMemberSub = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-subscription` , body , { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMemberSub = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/update-subscription` , body , { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteMemberSub = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/delete-subscription` , body , { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enrollMembership = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/enroll-membership` , body , { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw error;
  }
};