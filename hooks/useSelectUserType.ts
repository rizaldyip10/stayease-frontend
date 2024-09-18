import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import * as yup from "yup";
import authService from "@/services/authService";
import logger from "@/utils/logger";
import { useAlert } from "@/hooks/useAlert";

export type UserType = "USER" | "TENANT";

export interface FormValues {
  userType: UserType | "";
  businessName: string;
  taxId: string;
}

export const useSelectUserType = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { showAlert, alertInfo, hideAlert } = useAlert();

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
            avatar: response.avatar,
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
        // TODO !! Figure this out
        // setTimeout(() => {
        //   router.replace("/dashboard");
        //   redirect("/dashboard");
        // }, 5000);
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
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
    alertInfo,
    hideAlert,
  };
};
