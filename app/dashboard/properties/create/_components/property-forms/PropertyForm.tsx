"use client";
import React from "react";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import PropertyFormFields from "./PropertyFormFields";
import RoomForm from "./RoomForm";
import Link from "next/link";

interface FormValues {
  property: {
    name: string;
    description: string;
    imageUrl: string;
    address: string;
    city: string;
    country: string;
    longitude: number;
    latitude: number;
    categoryId: number;
  };
  rooms: {
    name: string;
    description: string;
    basePrice: number;
    capacity: number;
    imageUrl: string;
  }[];
  category: {
    name: string;
  };
}

interface PropertyFormProps {
  initialValues: FormValues;
  validationSchema: any;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => Promise<void>;
  isEditing: boolean;
  propertyId?: number;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  initialValues,
  validationSchema,
  onSubmit,
  isEditing,
  propertyId,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form className="space-y-8">
          <PropertyFormFields isEditing={isEditing} />
          <FieldArray name="rooms">
            {({ push, remove }) => (
              <div>
                {values.rooms.map((room, index) => (
                  <RoomForm
                    key={index}
                    index={index}
                    onRemove={() => remove(index)}
                    isEditing={isEditing}
                    propertyId={isEditing ? propertyId : undefined}
                  />
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    push({
                      name: "",
                      description: "",
                      basePrice: 0,
                      capacity: 0,
                      imageUrl: "",
                    })
                  }
                  className="mt-4 bg-blue-950 text-white hover:bg-blue-900"
                >
                  Add Room
                </Button>
              </div>
            )}
          </FieldArray>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-950 text-white hover:bg-blue-900"
          >
            {isEditing ? "Update Property" : "Create Property"}
          </Button>
          <Link
            href="/dashboard/properties"
            className="ml-4 inline-block text-blue-500 hover:underline"
          >
            Back to Properties
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyForm;
