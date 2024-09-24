import axios from "axios";
import { config } from "@/constants/url";

const axiosPublic = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

export default axiosPublic;
