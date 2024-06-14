import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

// Define the base URL for your API
const baseURL = "https://health-ct.azurewebsites.net";

// Create an instance of Axios with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage or other storage
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`; // Include the token in the Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors or perform additional operations
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
