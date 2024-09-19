import * as yup from "yup";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import { FormType } from "@/constants/Types";
import { UserType } from "@/hooks/useSelectUserType";
import * as Yup from "yup";

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

export const userTypeSelectSchema = yup.object().shape({
  userType: yup
    .string()
    .oneOf(["USER", "TENANT"])
    .required("User type is required"),
  businessName: yup.string().when("userType", {
    is: (val: UserType) => val === "TENANT",
    then: (schema) => schema.required("Business name is required for tenants"),
    otherwise: (schema) => schema.nullable(),
  }),
  taxId: yup.string().nullable(),
});

export const getValidationSchema = (formType: FormType) => {
  switch (formType) {
    case "login":
      return loginSchema;
    case "register":
      return registerSchema;
    case "userType":
      return userTypeSelectSchema;
    default:
      return registerSchema;
  }
};

export const createPropValidationSchema = yup.object().shape({
  property: yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    imageUrl: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    country: yup.string().required("Required"),
    longitude: yup.number().required("Required"),
    latitude: yup.number().required("Required"),
    categoryId: yup.string().required("Required"),
  }),
  rooms: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Required"),
      description: yup.string().required("Required"),
      basePrice: yup.number().required("Required").positive("Must be positive"),
      capacity: yup
        .number()
        .required("Required")
        .positive("Must be positive")
        .integer("Must be an integer"),
      imageUrl: yup.string().required("Required"),
    }),
  ),
  category: yup.object().shape({
    name: yup.string(),
  }),
});

export const contactFormValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string()
    .required("Message is required")
    .min(255, "Message must be at least 25 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});
