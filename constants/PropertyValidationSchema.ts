import * as yup from "yup";

export const roomAvailabilityValidationSchema = yup.object().shape({
  propertyId: yup.string().required("Property is required"),
  roomId: yup.string().required("Room is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
});
