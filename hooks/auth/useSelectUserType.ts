import { useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import * as yup from "yup";
import authService from "@/services/authService";
import logger from "@/utils/logger";
import { useAlert } from "@/context/AlertContext";

export type UserType = "USER" | "TENANT";

export interface FormValues {
  userType: UserType | "";
  businessName: string;
  taxId: string;
}

export const useSelectUserType = () => {
  const { data: session, update } = useSession();
  const { showAlert } = useAlert();

  const initialValues: FormValues = {
    userType: "",
    businessName: "",
    taxId: "",
  };

  const validationSchema = yup.object().shape({
    userType: yup
      .string()
      .oneOf(["USER", "TENANT"])
      .required("User type is required"),
    businessName: yup.string().when("userType", {
      is: (val: UserType) => val === "TENANT",
      then: (schema) =>
        schema.required("Business name is required for tenants"),
      otherwise: (schema) => schema.nullable(),
    }),
    taxId: yup.string().nullable(),
  });

  const handleUserTypeSubmit = useCallback(
    async (values: FormValues) => {
      try {
        const response = await authService.registerOAuth2({
          googleToken: session?.user.googleToken,
          userType: values.userType as UserType,
          businessName:
            values.userType === "TENANT" ? values.businessName : undefined,
          taxId: values.userType === "TENANT" ? values.taxId : undefined,
        });
        console.log("Session: ", session);

        await update({
          ...session,
          user: {
            ...session?.user,
            ...response,
            id: response.id,
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            userType: response.userType,
            avatar: response.avatarUrl,
            isVerified: response.isVerified,
            isOAuth2: response.isOAuth2,
            accessToken: response.token.accessToken,
            refreshToken: response.token.refreshToken,
            expiresAt: response.token.expiresAt,
            googleToken: null,
            isNewUser: false,
          },
        });

        await update();

        console.log("Updated session: ", session);

        showAlert("success", "Registration successful! Please sign in again.");
        setTimeout(() => {
          signOut({ redirect: true });
        }, 3000);
      } catch (error: any) {
        logger.error("Registration failed:", error);
        showAlert("error", "Registration failed. Please try again.");
      }
    },
    [session, update, showAlert],
  );

  return {
    initialValues,
    validationSchema,
    handleUserTypeSubmit,
  };
};
