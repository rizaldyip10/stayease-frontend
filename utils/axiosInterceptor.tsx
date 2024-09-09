import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL!;

const axiosInterceptor = axios.create({
    baseURL,
    withCredentials: true
});

export default axiosInterceptor;