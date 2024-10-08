import axios from "axios";
import { config } from "@/constants/url";
import { getToken } from "@auth/core/jwt";
import { getSession } from "next-auth/react";
import logger from "@/utils/logger";

const axiosInterceptor = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

const authStrings = [
  config.endpoints.auth.login,
  config.endpoints.auth.refreshToken,
  config.endpoints.auth.refreshAccessToken,
  config.endpoints.oauth2.checkUserExists,
  config.endpoints.oauth2.exchangeCode,
  config.endpoints.oauth2.registerOAuth2,
];

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

    // Apply dynamic baseURL logic only in local environment
    if (
      process.env.LOCAL_ENV &&
      process.env.NODE_ENV !== "production" &&
      process.env.NODE_ENV !== "development"
    ) {
      if (authStrings.some((str) => config.url?.includes(str))) {
        config.baseURL = process.env.NEXT_PUBLIC_LOGIN_URL;
      } else {
        config.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      }
    }

    return config;
  },
  (error) => {
    logger.error("Request interceptor error", { error });
    return Promise.reject(error);
  },
);

export default axiosInterceptor;
