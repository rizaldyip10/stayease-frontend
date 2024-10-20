import NextAuth, { NextAuthConfig, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { config } from "@/constants/url";
import axiosInterceptor from "@/utils/axiosInterceptor";
import logger from "@/utils/logger";
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
  trustHost: true,
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
          logger.info("Attempting login with:", { email: credentials?.email });
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
          let errorMessage = "An unknown error occurred";
          if (error.response?.status === 500) {
            errorMessage = "Invalid email or password";
          } else if (error.message) {
            errorMessage = error.message;
          }
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
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  events: {
    async signIn(message) {
      logger.info("Sign in event", { message });
      if (message.user.isNewUser && message.account?.provider === "google") {
        logger.info("New user sign up", { email: message.user.email });
      } else if (message.account?.provider === "google") {
        logger.info("Existing user sign in", { email: message.user.email });
      }
    },
    async signOut(message) {
      logger.info("Sign out event", { message });
    },
  },
  pages: {
    newUser: "/register/select-user-type",
    signIn: "/login",
    signOut: "/",
    error: "/login",
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
