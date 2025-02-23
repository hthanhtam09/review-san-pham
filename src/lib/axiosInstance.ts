import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
