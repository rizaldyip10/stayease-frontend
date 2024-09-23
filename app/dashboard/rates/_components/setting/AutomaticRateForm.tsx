import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikValues,
} from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AutomaticRateFormProps {
  // onSubmit: (data: AutomaticRateSettings) => void;
  // initialData?: AutomaticRateSettings | null;
}

const validationSchema = Yup.object().shape({
  holidayRate: Yup.number()
    .min(0, "Must be a positive number")
    .required("Holiday rate is required"),
  holidayRateType: Yup.string()
    .oneOf(["PERCENTAGE", "FIXED"], "Invalid rate type")
    .required("Holiday rate type is required"),
  weekendRate: Yup.number()
    .min(0, "Must be a positive number")
    .required("Weekend rate is required"),
  weekendRateType: Yup.string()
    .oneOf(["PERCENTAGE", "FIXED"], "Invalid rate type")
    .required("Weekend rate type is required"),
});

export const AutomaticRateForm: React.FC<AutomaticRateFormProps> = (
  {
    // onSubmit,
    // initialData,
  },
) => {
  const onSubmit = (data: FormikValues) => {
    console.log("Automatic rate data:", data);
  };

  const initialData = {
    holidayRate: 0,
    holidayRateType: "PERCENTAGE",
    weekendRate: 0,
    weekendRateType: "PERCENTAGE",
  };

  return (
    <Formik
      initialValues={
        initialData || {
          holidayRate: 0,
          holidayRateType: "PERCENTAGE",
          weekendRate: 0,
          weekendRateType: "PERCENTAGE",
        }
      }
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <Label htmlFor="holidayRate">Holiday Rate</Label>
                <Field name="holidayRate" as={Input} type="number" />
                <ErrorMessage
                  name="holidayRate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="holidayRateType">Holiday Rate Type</Label>
                <Field name="holidayRateType">
                  {({ field }: FieldProps) => (
                    <Select
                      onValueChange={(value) =>
                        setFieldValue("holidayRateType", value)
                      }
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                        <SelectItem value="FIXED">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="holidayRateType"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <Label htmlFor="weekendRate">Weekend Rate</Label>
                <Field name="weekendRate" as={Input} type="number" />
                <ErrorMessage
                  name="weekendRate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="weekendRateType">Weekend Rate Type</Label>
                <Field name="weekendRateType">
                  {({ field }: FieldProps) => (
                    <Select
                      onValueChange={(value) =>
                        setFieldValue("weekendRateType", value)
                      }
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                        <SelectItem value="FIXED">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="weekendRateType"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-950 text-white hover:bg-blue-900"
          >
            {initialData ? "Update Automatic Rates" : "Set Automatic Rates"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
