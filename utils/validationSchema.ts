import * as yup from "yup";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Please enter a valid password")
    .required("Please enter your password")
    .matches(whiteSpaceRegex, "Please enter a valid password"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
});

export const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    )
    .matches(whiteSpaceRegex, "Please enter a valid password")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

export const getValidationSchema = (formType: string) => {
  switch (formType) {
    case "login":
      return loginSchema;
    case "register":
      return registerSchema;
    case "verify":
      return setPasswordSchema;
    default:
      return setPasswordSchema;
  }
};
