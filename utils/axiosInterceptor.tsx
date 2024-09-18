import axios, { InternalAxiosRequestConfig } from "axios";
import { config } from "@/constants/url";

export const axiosInterceptor = axios.create({
    baseURL: config.BASE_URL,
    withCredentials: true,
});

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    console.log("Setting access token:", token);
    accessToken = token;
    if (token) {
        localStorage.setItem("accessToken", token);
        axiosInterceptor.defaults.headers.common["Authorization"] =
            `Bearer ${token}`;
        console.log("Token set in axios and localStorage");
    } else {
        localStorage.removeItem("accessToken");
        delete axiosInterceptor.defaults.headers.common["Authorization"];
        console.log("Token removed from axios and localStorage");
    }
};

export const getAccessToken = () => localStorage.getItem("accessToken");

// interceptor to add access token to request header
axiosInterceptor.interceptors.request.use(
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
axiosInterceptor.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axiosInterceptor.get(
                    config.endpoints.auth.status,
                );
                const newToken = response.data.token.accessToken;
                setAccessToken(newToken);
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                console.log(
                    "header in response: " + originalRequest.headers["Authorization"],
                );
                return axiosInterceptor(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error ? error.message : null);
    },
);

export default axiosInterceptor;