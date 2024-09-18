import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      userType: "USER" | "TENANT";
      firstName: string;
      lastName: string;
      avatar: string;
      isVerified: boolean;
      isOAuth2: boolean;
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
      googleToken?: string;
      isNewUser?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    userType: "USER" | "TENANT";
    firstName: string;
    lastName: string;
    avatar: string;
    isVerified: boolean;
    isOAuth2: boolean;
    token: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
    googleToken?: string;
    isNewUser?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    userType: "USER" | "TENANT";
    firstName: string;
    lastName: string;
    avatar: string;
    isVerified: boolean;
    isOAuth2: boolean;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    googleToken?: string;
    isNewUser?: boolean;
  }
}
