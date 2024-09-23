import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as yup from "yup";
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
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { RateRequest } from "@/services/rateService";
import { manualRateValidationSchema } from "@/utils/validationSchema";
import { formatDate } from "@/utils/dateFormatter";

interface ManualRateFormProps {
  onSubmit: (data: RateRequest) => void;
  initialData?: RateRequest;
}
export const ManualRateForm: React.FC<ManualRateFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const endMinDate = new Date(minDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
  const handleStartDateChange = (
    date: Date | undefined,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    setIsStartDateOpen(false);
    if (date) {
      setFieldValue("startDate", formatDate(date));
      setIsEndDateOpen(true);
    }
  };
  const handleEndDateChange = (
    date: Date | undefined,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean,
    ) => void,
  ) => {
    setIsEndDateOpen(false);
    if (date) {
      setFieldValue("endDate", formatDate(date));
    }
  };

  return (
    <Formik
      initialValues={
        initialData || {
          startDate: new Date(),
          endDate: new Date(),
          adjustmentRate: 0,
          adjustmentType: "PERCENTAGE",
          reason: "",
        }
      }
      validationSchema={manualRateValidationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Field name="startDate">
                {({ field }: FieldProps) => (
                  <CustomDatePicker
                    title="Select start date"
                    date={field.value}
                    onDateChange={(date) =>
                      handleStartDateChange(date, setFieldValue)
                    }
                    minDate={minDate}
                    open={isStartDateOpen}
                    setOpen={setIsStartDateOpen}
                  />
                )}
              </Field>
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="endDate">End Date</Label>
              <Field name="endDate">
                {({ field }: FieldProps) => (
                  <CustomDatePicker
                    title="Select end date"
                    date={field.value}
                    onDateChange={(date) =>
                      handleEndDateChange(date, setFieldValue)
                    }
                    minDate={endMinDate}
                    open={isEndDateOpen}
                    setOpen={setIsEndDateOpen}
                  />
                )}
              </Field>
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <Label htmlFor="adjustmentRate">Adjustment Rate</Label>
              <Field name="adjustmentRate" as={Input} type="number" />
              <ErrorMessage
                name="adjustmentRate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="adjustmentType">Adjustment Type</Label>
              <Field name="adjustmentType">
                {({ field }: FieldProps) => (
                  <Select
                    onValueChange={(value) =>
                      setFieldValue("adjustmentType", value)
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
                name="adjustmentType"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
          <div className="flex-1">
            <Label htmlFor="reason">Reason</Label>
            <Field name="reason" as={Input} />
            <ErrorMessage
              name="reason"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-950 text-appgray hover:bg-appgray hover:text-blue-950 mt-5"
          >
            {initialData ? "Update Rate" : "Set Rate"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
