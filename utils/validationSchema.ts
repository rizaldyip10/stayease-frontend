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
