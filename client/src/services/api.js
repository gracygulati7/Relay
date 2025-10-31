import axios from "axios";

const BASE_URL = "http://localhost:5000";

const getConfig = () => {
  const token = localStorage.getItem("token"); 
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getAllThreads = () => axios.get(`${BASE_URL}/threads`);
export const getThreadById = (id) => {
  if (!id) throw new Error("Thread ID is required");
  return axios.get(`${BASE_URL}/threads/${id}`);
};

export const createThread = (data) => axios.post(`${BASE_URL}/threads`, data, getConfig());
export const updateThread = (id, data) => axios.put(`${BASE_URL}/threads/${id}`, data, getConfig());
export const deleteThread = (id) => axios.delete(`${BASE_URL}/threads/${id}`, getConfig());

export const getComments = (threadId) =>
  axios.get(`${BASE_URL}/api/threads/${threadId}/comments`);
export const addComment = (threadId, data) =>
  axios.post(`${BASE_URL}/api/threads/${threadId}/comments`, data);

export const signupUser = (data) => axios.post(`${BASE_URL}/api/auth/signup`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/api/auth/login`, data);
