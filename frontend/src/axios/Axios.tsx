import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

// Base URL for the API
const baseURL = "https://health-connect-kyp7.onrender.com";

// Create an axios instance with the base URL and default headers
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

// Add a response interceptor to handle errors and refresh authentication if needed
axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if it's successful
  async (error: AxiosError) => {
    // Handle error response
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if the error status is 401 (Unauthorized)
    // and if the original request has not already been retried
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Mark the original request as retried
      originalRequest._retry = true;
      try {
        // Try to refresh the authentication by making a request to check-auth endpoint
        await axiosInstance.get("/api/auth/check-auth");
        // Retry the original request with refreshed authentication
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle authentication failure by redirecting to the root path
        window.location.href = "/";
        // Reject the promise with the refresh error
        return Promise.reject(refreshError);
      }
    }
    // If the error is not 401 or if the request was already retried, reject the promise with the original error
    return Promise.reject(error);
  }
);

// Export the axios instance for use in other parts of the application
export default axiosInstance;
