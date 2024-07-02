import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// Define the base URL for your API
const baseURL =
  /*"https://health-ct.azurewebsites.net"*/ "https://health-connect-kyp7.onrender.com";

// Create an instance of Axios with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token and user role in the headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Remove custom headers for the login request
    if (config.url === "/api/auth/login") {
      delete config.headers!.Authorization;
      delete config.headers!.Role;
    } else {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");

      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }

      if (userRole) {
        config.headers!.Role = userRole;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
