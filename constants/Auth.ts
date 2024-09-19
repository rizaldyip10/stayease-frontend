import { TenantType } from "@/constants/Users";

export type SocialLoginRequest = {
  provider: string;
  providerUserId: string;
  email: string;
  userType: string;
  firstName: string;
  lastName: string;
  avatar: string;
  businessName?: string;
  taxId?: string;
};

export interface User {
  id: string;
  email: string;
  userType: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  joinedAt: Date;
  isVerified: boolean;
  isOAuth2: boolean;
}

export interface UserTenant extends User {
  tenantInfo?: TenantType;
}

export interface AuthResponse {
  id: string;
  email: string;
  userType: "USER" | "TENANT";
  isVerified: boolean;
  firstName: string;
  lastName: string;
  avatar: string;
  isOAuth2: boolean;
  token: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}

export interface RegisterResponse {
  message: string;
  verificationLink: string;
}

export interface ExchangeCodeRequest {
  googleToken: string;
  userType: "USER" | "TENANT";
  businessName?: string;
  taxId?: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface TokenCheckResponse {
  statusCode: number;
  statusMessage: string;
  data: {
    isValid: boolean;
  };
}