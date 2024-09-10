import axios, { InternalAxiosRequestConfig } from "axios";
import { config } from "@/constants/url";

export const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  console.log("Setting access token:", token);
  accessToken = token;
  if (token) {
    localStorage.setItem("accessToken", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token set in axios and localStorage");
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
    console.log("Token removed from axios and localStorage");
  }
};

export const getAccessToken = () => localStorage.getItem("accessToken");

// interceptor to add access token to request header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getAccessToken();
    console.log("Interceptor: Using token:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("header sent in request: " + config.headers["Authorization"]);
    }
    return config;
  },
  (error) => Promise.reject(error ? error.message : null),
);

// interceptor to handle refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // You might need to adjust this part depending on how you want to handle token refresh
        const response = await axiosInstance.get(config.endpoints.auth.status);
        const newToken = response.data.token.accessToken;
        setAccessToken(newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error ? error.message : null);
  },
);

export default axiosInstance;
