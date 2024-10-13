import axios from "axios";
import { config } from "@/constants/url";
import { getToken } from "@auth/core/jwt";
import { getSession } from "next-auth/react";
import logger from "@/utils/logger";

const axiosInterceptor = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

axiosInterceptor.interceptors.request.use(
  async (config) => {
    let token: string | undefined;

    if (typeof window !== "undefined") {
      // Client-side
      const session = await getSession();
      token = session?.user.accessToken;
      logger.debug("Client-side token retrieval", { tokenExists: !!token });
    } else {
      // Server-side
      const jwtToken = await getToken({
        req: config,
        secret: process.env.NEXTAUTH_SECRET || "",
      });
      logger.debug("JWT token", { jwtToken });
      token = jwtToken?.accessToken as string | undefined;
      logger.debug("Server-side token retrieval", { tokenExists: !!token });
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
      logger.debug("Token added to request headers");
    }

    return config;
  },
  (error) => {
    logger.error("Request interceptor error", { error });
    return Promise.reject(error);
  },
);

export default axiosInterceptor;
