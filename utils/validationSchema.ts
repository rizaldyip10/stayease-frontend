import * as yup from "yup";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import { FormType } from "@/constants/Types";

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

export const getValidationSchema = (formType: FormType) => {
  switch (formType) {
    case "login":
      return loginSchema;
    case "register":
      return registerSchema;
    default:
      return registerSchema;
  }
};
