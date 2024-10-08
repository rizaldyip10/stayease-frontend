export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userType: string;
  avatarUrl: string | null;
  joinedAt: string;
};

export type TenantType = {
  user: UserType;
  businessName: string;
  registerDate: string;
};

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  joinedAt: Date;
  userType: string;
  tenantInfo?: TenantProfile;
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
