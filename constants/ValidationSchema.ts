import * as yup from "yup";
import { whiteSpaceRegex } from "@/constants/WhiteSpaceRegex";
import { FormType } from "@/constants/Types";
import { UserType } from "@/hooks/auth/useSelectUserType";
export const getValidationSchema = (formType: FormType) => {
  switch (formType) {
    case "login":
      return loginSchema;
    case "register":
      return registerSchema;
    case "userType":
      return userTypeSelectSchema;
    case "forgotPassword":
      return passwordSchema;
    default:
      return registerSchema;
  }
};

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

export const verifyValidationSchema = (userType: UserType) => [
  yup.object().shape({
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
  }),
  yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    phoneNumber: yup.string(),
  }),
  userType === "TENANT"
    ? yup.object({
        businessName: yup.string().required("Required"),
        taxId: yup.string(),
      })
    : yup.object({}),
];

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

export const passwordSchema = yup.object().shape({
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

export const createPropValidationSchema = yup.object().shape({
  property: yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
    imageUrl: yup.string().required("Required"),
    address: yup.string().required("Required"),
    city: yup.string().required("Required"),
    country: yup
      .string()
      .oneOf(["Indonesia"], "Must be in Indonesia")
      .required("Required"),
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

export const contactFormValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  message: yup
    .string()
    .required("Message is required")
    .min(255, "Message must be at least 25 characters")
    .max(1000, "Message must not exceed 1000 characters"),
});

export const manualRateValidationSchema = yup.object().shape({
  startDate: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Start date must be after today"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be after start date"),
  adjustmentRate: yup
    .number()
    .required("Adjustment rate is required")
    .moreThan(0, "Must be more than 0"),
  adjustmentType: yup
    .string()
    .oneOf(["PERCENTAGE", "FIXED"], "Invalid adjustment type")
    .required("Adjustment type is required"),
  reason: yup
    .string()
    .required("Reason is required")
    .min(3, "Reason must be at least 5 characters")
    .test(
      "not-including-automatic",
      `Reason cannot include the word "Automatic"`,
      function (value) {
        const forbiddenReasons = /\bautomatic\b/i;
        return !forbiddenReasons.test(value);
      },
    ),
});

export const autoRateSettingValidationSchema = yup
  .object()
  .shape({
    useAutoRates: yup.boolean(),
    holidayAdjustmentRate: yup
      .number()
      .nullable()
      .when("useAutoRates", {
        is: true,
        then: (schema) => schema.min(0, "Must be a positive number or empty"),
        otherwise: (schema) => schema.strip(),
      }),
    holidayAdjustmentType: yup
      .string()
      .nullable()
      .when("holidayAdjustmentRate", {
        is: (val: number | null) => val !== null && val > 0,
        then: (schema) =>
          schema.required(
            "Holiday adjustment rate type is required when rate is set",
          ),
        otherwise: (schema) => schema.nullable(),
      }),
    longWeekendAdjustmentRate: yup
      .number()
      .nullable()
      .when("useAutoRates", {
        is: true,
        then: (schema) => schema.min(0, "Must be a positive number or empty"),
        otherwise: (schema) => schema.strip(),
      }),
    longWeekendAdjustmentType: yup
      .string()
      .nullable()
      .when("longWeekendAdjustmentRate", {
        is: (val: number | null) => val !== null && val > 0,
        then: (schema) =>
          schema.required(
            "Long weekend adjustment rate type is required when rate is set",
          ),
        otherwise: (schema) => schema.nullable(),
      }),
  })
  .test(
    "at-least-one-rate",
    "At least one of Holiday or Long Weekend rate must be set when auto rate is enabled",
    function (values) {
      if (values.useAutoRates) {
        return (
          (values.holidayAdjustmentRate ?? 0) > 0 ||
          (values.longWeekendAdjustmentRate ?? 0) > 0
        );
      }
      return true;
    },
  );
