import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import logger from "@/utils/logger";
import { signOut } from "@/auth";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  joinedAt: Date;
  userType: string;
  tenantInfo?: {
    businessName: string;
    taxId?: string;
    registeredDate: Date;
  };
}

export interface TenantProfile {
  businessName: string;
  taxId?: string;
  registeredDate: Date;
}

export interface UserImage {
  avatarUrl: string;
}

export interface UserImageResponse {
  data: UserImage;
}

export interface UpdateProfile {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatar?: string;
}

const transformUserProfile = (res: any): UserProfile => ({
  id: res.data.id,
  email: res.data.email,
  firstName: res.data.firstName,
  lastName: res.data.lastName,
  phoneNumber: res.data.phoneNumber ?? "",
  avatarUrl: res.data.avatarUrl ?? "",
  joinedAt: new Date(res.data.joinedAt),
  userType: res.data.userType,
  tenantInfo: res.data.tenantInfo && {
    businessName: res.data.tenantInfo.businessName ?? "",
    taxId: res.data.tenantInfo.taxId ?? "",
    registeredDate: new Date(res.data.tenantInfo.registrationDate),
  },
});

export const profileService = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await axiosInterceptor.get<UserProfile>(
      config.endpoints.users.profile,
    );
    console.log("fetching profile:", response.data);
    return transformUserProfile(response.data);
  },

  updateProfile: async (
    values: Partial<UpdateProfile>,
  ): Promise<UserProfile> => {
    const response = await axiosInterceptor.put<UserProfile>(
      config.endpoints.users.profile,
      values,
    );
    return transformUserProfile(response.data);
  },

  updateTenantProfile: async (
    values: Partial<TenantProfile>,
  ): Promise<UserProfile> => {
    const response = await axiosInterceptor.put<UserProfile>(
      config.endpoints.users.tenant,
      values,
    );
    return transformUserProfile(response.data);
  },

  uploadAvatar: async (file: File): Promise<UserImage> => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axiosInterceptor.post<UserImageResponse>(
      config.endpoints.users.avatar,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("response from profileService.uploadAvatar:", response);
    return {
      // this is actually correct, the API returns avatarUrl
      avatarUrl: response.data.data.avatarUrl,
    };
  },

  setOrRemoveAvatar: async (
    userImage: UserImage | null,
  ): Promise<UserImage> => {
    if (userImage === null) {
      // If userImage is null, send a request to remove the avatar

      await axiosInterceptor.put(config.endpoints.users.avatar);
      return { avatarUrl: "" };
    } else {
      // If userImage is not null, send a request to set the new avatar
      const response = await axiosInterceptor.put<UserImageResponse>(
        config.endpoints.users.avatar,
        userImage,
      );
      console.log("response from profileService.setOrRemoveAvatar:", response);
      if (!response.data || !response.data.data.avatarUrl) {
        throw new Error("Failed to set avatar");
      }
      return {
        avatarUrl: response.data.data.avatarUrl,
      };
    }
  },

  changeEmailRequest: async (newEmail: string): Promise<void> => {
    try {
      logger.info("Requesting email change");
      await axiosInterceptor.post(config.endpoints.users.email, { newEmail });
      logger.info("Email change request successful");
    } catch (error: any) {
      logger.error("Email change request failed", { error });
      throw error;
    }
  },

  verifyEmailChange: async (token: string): Promise<void> => {
    try {
      logger.info("Verifying email change");
      await axiosInterceptor.put(config.endpoints.users.email, null, {
        params: { token },
      });
      logger.info("Email change verification successful");
    } catch (error: any) {
      logger.error("Email change verification failed", { error });
      throw error;
    }
  },

  deleteAccount: async (): Promise<void> => {
    try {
      logger.info("Deleting account");
      await axiosInterceptor.delete(config.endpoints.users.delete);
      logger.info("Account deletion successful");
      await signOut({ redirect: true });
    } catch (error: any) {
      logger.error("Account deletion failed", { error });
      throw error;
    }
  },
};
