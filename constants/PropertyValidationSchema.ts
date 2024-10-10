import * as yup from "yup";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

// Room availability schema
export const roomAvailabilityValidationSchema = yup.object().shape({
  propertyId: yup.string().required("Property is required"),
  roomId: yup.string().required("Room is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
});

// Rate related schemas
export const manualRateValidationSchema = yup.object().shape({
  startDate: yup
    .date()
    .required("Start date is required")
    .min(tomorrow, "Start date must be after today"),
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
    .min(5, "Reason must be at least 5 characters")
    .test(
      "not-including-automatic",
      `Reason cannot include the word "Automatic"`,
      function (value) {
        const forbiddenReasons = /\bautomatic\b/i;
        return !forbiddenReasons.test(value);
      },
    ),
});

export const editManualRateValidationSchema = yup.object().shape({
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
    .min(5, "Reason must be at least 5 characters")
    .test(
      "not-including-automatic",
      `Reason cannot include the word "Automatic"`,
      function (value) {
        const forbiddenReasons = /\bautomatic\b/i;
        return !forbiddenReasons.test(value);
      },
    ),
});
