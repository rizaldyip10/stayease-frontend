import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatar?: string;
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

export interface UsersImage {
  avatarUrl: string;
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
  avatar: res.data.avatar ?? "",
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

  uploadAvatar: async (file: File): Promise<UsersImage> => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axiosInterceptor.post<UsersImage>(
      config.endpoints.users.avatar,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return {
      avatarUrl: response.data.avatarUrl,
    };
  },
};
