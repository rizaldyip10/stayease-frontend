import logger from "@/utils/logger";
import axiosInterceptor from "@/utils/axiosInterceptor";
import { config } from "@/constants/url";
import { logError } from "@/utils/errorHandler";
import { AuthResponse, ExchangeCodeRequest } from "@/constants/Auth";

export const oAuth2Service = {
  checkUserExists: async (email: string): Promise<boolean> => {
    try {
      logger.info("Checking if user exists", { email });
      const response = await axiosInterceptor.post(
        config.endpoints.oauth2.checkUserExists,
        { email },
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

  exchangeCode: async (code: string): Promise<AuthResponse> => {
    try {
      logger.info("Exchanging code for tokens");
      const response = await axiosInterceptor.post(
        config.endpoints.oauth2.exchangeCode,
        { token: code },
      );
      logger.info("Code exchange successful");
      return response.data.data;
    } catch (error: any) {
      logger.error("Code exchange failed", { error });
      logError(error);
      throw error;
    }
  },
};
