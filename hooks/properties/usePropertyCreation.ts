"use client";
import { useCallback, useState } from "react";
import { FormikHelpers } from "formik";
import propertyService from "@/services/propertyService";
import { useAlert } from "@/context/AlertContext";

interface Category {
  id: number;
  name: string;
}

type FormValues = {
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
};

export const usePropertyCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showAlert } = useAlert();
  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Create property (image already uploaded)
      const propertyData = {
        ...values.property,
        longitude: Number(values.property.longitude),
        latitude: Number(values.property.latitude),
      };
      const propertyResponse =
        await propertyService.createProperty(propertyData);
      const newPropertyId = propertyResponse.id;
      console.log("Property created successfully:", propertyResponse);

      // Step 2: Create rooms (images already uploaded)
      for (const room of values.rooms) {
        try {
          await propertyService.createRoom(newPropertyId, room);
          console.log("Room created successfully:", room);
        } catch (error) {
          console.error(`Error creating room:`, error);
          setError(`Failed to create room: ${room.name}`);
        }
      }

      console.log("Property and rooms created successfully");
      formikHelpers.setSubmitting(false);
      showAlert(
        "success",
        "Property and rooms created successfully",
        "/dashboard/properties",
      );
    } catch (error) {
      setError("Failed to create property and rooms");
      console.error("Error submitting form:", error);
      formikHelpers.setSubmitting(false);
      showAlert(
        "error",
        "Failed to create property and rooms",
        "/dashboard/properties",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleSubmit,
  };
};
