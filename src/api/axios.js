import axios from "axios";

// Create an instance of axios with the base URL of your future Node.js server
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR: This is a professional must-have.
// It automatically attaches your JWT Token to every request so the server knows who you are.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("homlioo_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
