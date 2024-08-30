import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL!;

const axiosFn = axios.create({
    baseURL,
    withCredentials: true
});

export default axiosFn;