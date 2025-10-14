import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Helper to get auth config
const getConfig = () => {
  const token = localStorage.getItem("token"); // JWT stored in localStorage after login
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Threads APIs
export const getAllThreads = () => axios.get(`${BASE_URL}/threads`);
export const getThreadById = (id) => {
  if (!id) throw new Error("Thread ID is required");
  return axios.get(`${BASE_URL}/threads/${id}`);
};

// Protected routes (need login)
export const createThread = (data) => axios.post(`${BASE_URL}/threads`, data, getConfig());
export const updateThread = (id, data) => axios.put(`${BASE_URL}/threads/${id}`, data, getConfig());
export const deleteThread = (id) => axios.delete(`${BASE_URL}/threads/${id}`, getConfig());

// Comments (can be public for now)
export const getComments = (threadId) =>
  axios.get(`${BASE_URL}/api/threads/${threadId}/comments`);
export const addComment = (threadId, data) =>
  axios.post(`${BASE_URL}/api/threads/${threadId}/comments`, data);

// Auth APIs
export const signupUser = (data) => axios.post(`${BASE_URL}/api/auth/signup`, data);
export const loginUser = (data) => axios.post(`${BASE_URL}/api/auth/login`, data);
