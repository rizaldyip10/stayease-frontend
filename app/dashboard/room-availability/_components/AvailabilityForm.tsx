import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, Form, Formik } from "formik";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateFormatter";
import * as yup from "yup";
import CustomSelect from "@/components/CustomSelect";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import { useTenantProperties } from "@/hooks/useTenantProperties";
import { CustomDatePicker } from "@/components/CustomDatePicker";

interface AvailabilityFormProps {
  onSubmit: (roomId: number, startDate: Date, endDate: Date) => void;
}

const validationSchema = yup.object().shape({
  propertyId: yup.string().required("Property is required"),
  roomId: yup.string().required("Room is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
});

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ onSubmit }) => {
  const [isStartDateOpen, setIsStartDateOpen] = useState(false);
  const [isEndDateOpen, setIsEndDateOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null,
  );
  const { properties } = useTenantProperties();
  const { rooms } = usePropertyData(
    selectedPropertyId ? parseInt(selectedPropertyId) : 0,
  );

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const endMinDate = new Date(minDate.getTime() + 24 * 60 * 60 * 1000);

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
      initialValues={{
        propertyId: "",
        roomId: "",
        startDate: "",
        endDate: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(
          parseInt(values.roomId),
          new Date(values.startDate),
          new Date(values.endDate),
        );
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <Label htmlFor="propertyId">Property</Label>
            <CustomSelect
              title="Select Property"
              options={properties?.map((property) => ({
                label: property.propertyName,
                value: property.id.toString(),
              }))}
              onChange={(value) => {
                setSelectedPropertyId(value);
                setFieldValue("propertyId", value);
                setFieldValue("roomId", "");
              }}
              value={values.propertyId}
            />
            <ErrorMessage
              name="propertyId"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="roomId">Room</Label>
            <CustomSelect
              title="Select Room"
              options={rooms?.map((room) => ({
                label: room.name,
                value: room.id.toString(),
              }))}
              onChange={(value) => {
                setFieldValue("roomId", value);
              }}
              value={values.roomId}
              disabled={!values.propertyId}
            />
            <ErrorMessage
              name="roomId"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Field name="startDate">
              {({ field }: FieldProps) => (
                <CustomDatePicker
                  title="Select start date"
                  date={field.value ? new Date(field.value) : undefined}
                  onDateChange={(date) => {
                    if (date) {
                      setFieldValue("startDate", formatDate(date));
                      setIsStartDateOpen(false);
                      setIsEndDateOpen(true);
                    }
                  }}
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
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Field name="endDate">
              {({ field }: FieldProps) => (
                <CustomDatePicker
                  title="Select end date"
                  date={field.value ? new Date(field.value) : undefined}
                  onDateChange={(date) => {
                    if (date) {
                      setFieldValue("endDate", formatDate(date));
                      setIsEndDateOpen(false);
                    }
                  }}
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
          <Button type="submit" className="bg-blue-950 text-white">
            Set Availability
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AvailabilityForm;
