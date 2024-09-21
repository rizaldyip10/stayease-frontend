import { config } from "@/constants/url";
import { UserType } from "@/constants/Types";
import axiosInterceptor from "@/utils/axiosInterceptor";
import {
  RefreshResponse,
  ExchangeCodeRequest,
  RegisterResponse,
  AuthResponse,
  TokenCheckResponse,
  ForgotPasswordValues,
} from "@/constants/Auth";
import { signIn } from "@/auth";

import logger from "@/utils/logger";
import { FormikValues } from "formik";
import { logError } from "@/utils/errorHandler";
import axios from "axios";

export const authService = {
  register: async (
    email: string,
    userType: UserType,
  ): Promise<RegisterResponse> => {
    try {
      logger.info("Initiating registration", { email, userType });
      const response = await axiosInterceptor.post(
        config.endpoints.registration.register,
        { email },
        { params: { userType } },
      );
      logger.info("Registration successful", { email });
      return {
        message: response.data.data.message,
        verificationLink: response.data.data.verificationLink,
      };
    } catch (error: any) {
      logger.error("Registration failed", { error, email });
      logError(error);
      throw error;
    }
  },

  checkToken: async (token: string): Promise<TokenCheckResponse> => {
    const response = await axiosInterceptor.post(
      config.endpoints.registration.checkToken,
      { token },
    );
    console.log("Calling check token endpoint, token: ", token);
    return response.data;
  },

  verify: async (values: FormikValues, token: string): Promise<any> => {
    const response = await axiosInterceptor.post(
      config.endpoints.registration.verify,
      values,
      { params: { token }, headers: { "Content-Type": "application/json" } },
    );
    console.log("Calling verify endpoint, response: ", response);
    return response.data;
  },
  login: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      logger.info("Initiating login", { email });
      const response = await axiosInterceptor.post(
        config.endpoints.auth.login,
        { email, password },
      );
      logger.info("Login successful", { email });
      return response.data.data;
    } catch (error: any) {
      logger.error("Login failed", { error, email });
      throw error;
    }
  },

  checkUserExists: async (email: string): Promise<boolean> => {
    try {
      logger.info("Checking if user exists", { email });
      const response = await axiosInterceptor.post(
        config.endpoints.oauth2.checkUserExists,
        email,
      );
      logger.info("User existence check complete", {
        email,
        exists: response.data.data,
      });
      return response.data.data;
    } catch (error: any) {
      logger.error("User existence check failed", { error, email });
      logError(error);
      return false;
    }
  },

  registerOAuth2: async (
    values: Partial<ExchangeCodeRequest>,
  ): Promise<AuthResponse> => {
    try {
      logger.info("Registering OAuth2 user", { values });
      const response = await axiosInterceptor.post(
        config.endpoints.oauth2.registerOAuth2,
        values,
      );
      logger.info("OAuth2 registration successful");
      return response.data.data;
    } catch (error: any) {
      logger.error("OAuth2 registration failed", {
        values,
      });
      logError(error);
      throw error;
    }
  },

  reAuthenticate: async (googleToken: string) => {
    try {
      logger.info("Re-authenticating with Google");
      const result = await signIn("google", {
        token: { id_token: googleToken },
        redirect: false,
      });
      if (result?.error) {
        throw new Error(result.error);
      }
      logger.info("Re-authentication successful");
      return result;
    } catch (error) {
      logger.error("Re-authentication failed", { error });
      throw error;
    }
  },

  exchangeCode: async (code: string): Promise<AuthResponse> => {
    try {
      logger.info("Exchanging code for tokens");
      const response = await axiosInterceptor.post(
        config.endpoints.oauth2.exchangeCode,
        code,
      );
      logger.info("Code exchange successful");
      return response.data.data;
    } catch (error: any) {
      logger.error("Code exchange failed", { error });
      logError(error);
      throw error;
    }
  },

  isAccessTokenNearExpiry: (token: any): boolean => {
    if (!token || !token.accessToken) return true;
    try {
      const decoded = JSON.parse(atob(token.accessToken.split(".")[1]));
      const isNearExpiry = decoded.exp * 1000 < Date.now() + 5 * 60 * 1000;
      logger.debug("Access token expiry check", { isNearExpiry });
      return isNearExpiry;
    } catch (error) {
      logger.error("Error decoding accessToken", { error });
      return true;
    }
  },

  refreshBothTokens: async (refreshToken: string): Promise<RefreshResponse> => {
    try {
      logger.info("Refreshing both tokens");
      const response = await axiosInterceptor.post(
        config.endpoints.auth.refreshToken,
        refreshToken,
      );
      logger.info("Both tokens refreshed successfully");
      return response.data.data;
    } catch (error: any) {
      logger.error("Error refreshing both tokens", { error });
      throw error;
    }
  },

  refreshAccessToken: async (
    refreshToken: string,
  ): Promise<RefreshResponse> => {
    try {
      logger.info("Refreshing access token");
      const response = await axiosInterceptor.post(
        config.endpoints.auth.refreshAccessToken,
        refreshToken,
      );
      logger.info("Access token refreshed successfully");
      return response.data.data;
    } catch (error: any) {
      logger.error("Error refreshing access token", { error });
      throw error;
    }
  },

  logout: async (email: string | undefined): Promise<void> => {
    try {
      logger.info("Logging out user");
      await axiosInterceptor.post(config.endpoints.auth.logout, email);
      logger.info("Logout successful");
    } catch (error: any) {
      logger.error("Logout failed", { error });
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<any> => {
    try {
      logger.info("Initiating forgot password", { email });
      const res = await axiosInterceptor.post(
        config.endpoints.password.forgot,
        { email },
      );
      logger.info("Forgot password successful", { email });
      return res.data;
    } catch (error: any) {
      try {
        const response = await axios.post(
          `${config.BASE_URL}${config.endpoints.password.forgot}`,
          { email },
        );
        logger.info("Unlogged user requesting for forgot password", { email });
        logger.info("Forgot password successful", response.data);
        return response.data;
      } catch (error: any) {
        logger.error("Forgot password failed", { error, email });
        throw error;
      }
    }
  },

  resetPassword: async (
    token: string,
    values: ForgotPasswordValues,
  ): Promise<any> => {
    try {
      logger.info("Initiating password reset, values: ", values);
      const res = await axiosInterceptor.post(
        config.endpoints.password.reset,
        values,
        {
          params: { token },
        },
      );
      logger.info("Password reset successful");
      return res.data;
    } catch (error: any) {
      try {
        const response = await axios.post(
          `${config.BASE_URL}${config.endpoints.password.reset}`,
          {
            password: values.password,
            confirmPassword: values.confirmPassword,
          },
          { params: { token } },
        );
        logger.info("Forgot password successful", response.data.data);
        return response.data;
      } catch (error: any) {
        logger.error("Forgot password failed", { error });
        throw error;
      }
    }
  },
};

export default authService;
