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
    if (process.env.LOCAL_ENV) {
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

// axiosInterceptor.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       console.log("Axios interceptor caught 401 error");
//       originalRequest._retry = true;
//
//       // Refresh the tokens using NextAuth, call for a new session
//       const { data: session } = useSession();
//       console.log("Session: ", session);
//       if (session) {
//         console.log("Refreshing tokens with NextAuth");
//         // Reattach the new access token to the request
//         axiosInterceptor.defaults.headers.common["Authorization"] =
//           `Bearer ${session.user.accessToken}`;
//         return axiosInterceptor(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// ! handling this in auth.ts
// axiosInterceptor.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { data: session } = useSession();
//     const originalRequest = error.config;
//
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshTokenExpiry = session?.user?.expiresAt;
//       const now = Date.now();
//       const isNearExpiry =
//         refreshTokenExpiry && refreshTokenExpiry - now < 15 * 60 * 1000; // 15 minutes threshold
//       try {
//         if (isNearExpiry) {
//           // refresh both tokens
//           console.log("Refreshing both tokens");
//           const response = await axiosInterceptor.post(
//             config.endpoints.auth.refreshToken,
//             session.user.refreshToken,
//           );
//           const { accessToken, refreshToken, expiresAt } = response.data.data;
//
//           session.user.accessToken = accessToken;
//           session.user.refreshToken = refreshToken;
//           session.user.expiresAt = expiresAt;
//           return axiosInterceptor(originalRequest);
//         } else {
//           // just refresh access token
//           console.log("Refreshing access token");
//           const response = await axiosInterceptor.post(
//             config.endpoints.auth.refreshAccessToken,
//             session?.user.refreshToken,
//           );
//           if (session) {
//             const { accessToken } = response.data.data.accessToken;
//             session.user.accessToken = accessToken;
//           } else {
//             console.error("No session found");
//             await signOut({ redirectTo: "/login" });
//           }
//         }
//       } catch (refreshError) {
//         // In case refresh fails, log out the user
//         await signOut({ redirectTo: "/login" });
//         return Promise.reject(refreshError);
//       }
//       return Promise.reject(error);
//     }
//   },
// );

export default axiosInterceptor;
