import NextAuth, { NextAuthConfig, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import logger from "@/utils/logger";
import { getSession, signOut as nextAuthSignOut } from "next-auth/react";
import {
  handleGoogleSignIn,
  handleJwtCallback,
  handleSessionCallback,
} from "@/utils/authHelpers";

interface AuthCallbacks {
  handleGoogleSignIn: (params: {
    user: User;
    account: any;
    profile: any;
  }) => Promise<boolean>;
  handleJwtCallback: (params: {
    token: JWT;
    user?: User;
    account?: any;
    trigger?: "signIn" | "signUp" | "update";
    session?: any;
  }) => Promise<JWT>;
  handleSessionCallback: (params: {
    session: Session;
    token: JWT;
  }) => Promise<Session>;
}

const authCallbacks: AuthCallbacks = {
  handleGoogleSignIn,
  handleJwtCallback,
  handleSessionCallback,
};

const nextAuthConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axiosInterceptor.post(
            config.endpoints.auth.login,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );
          logger.info("Credentials login successful", {
            email: credentials?.email,
          });
          return response.data.data;
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "An error occurred";
          logger.error("Credentials login failed", {
            error: errorMessage,
            email: credentials?.email,
          });
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      return authCallbacks.handleGoogleSignIn({ user, account, profile });
    },
    async jwt({ token, user, account, trigger, session }) {
      return authCallbacks.handleJwtCallback({
        token,
        user,
        account,
        trigger,
        session,
      });
    },
    async session({ session, token }) {
      return authCallbacks.handleSessionCallback({ session, token });
    },
  },
  pages: {
    newUser: "/register/select-user-type",
    signOut: "/",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth(nextAuthConfig);

// Custom signOut function
export const signOut = async (options?: {
  callbackUrl?: string;
  redirect?: boolean;
}) => {
  try {
    // Call backend logout endpoint
    const session = await getSession();
    const email = session?.user?.email;
    await axiosInterceptor.post(config.endpoints.auth.logout, email);
    logger.info("Backend logout successful");
  } catch (error) {
    logger.error("Backend logout failed", { error });
  }

  // Perform the original signOut from next-auth
  return nextAuthSignOut(options);
};
