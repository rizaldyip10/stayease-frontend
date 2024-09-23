"use client";
import { useCallback, useState } from "react";
import { FormikHelpers } from "formik";
import propertyService from "@/services/propertyService";
import { usePropertyUtils } from "@/hooks/usePropertyUtils";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await propertyService.getAllCategories();
      setCategories(response);
    } catch (error) {
      setError("Failed to fetch categories");
      console.error("Error fetching categories:", error);
    }
  }, []);

  const handleImageUpload = useCallback(
    async (
      file: File,
      fieldName: string,
      setFieldValue: (field: string, value: any) => void,
    ): Promise<void> => {
      try {
        const imageUrl = await propertyService.uploadImage(file);
        console.log("Image uploaded successfully, url:", imageUrl);
        setFieldValue(fieldName, imageUrl);
      } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
      }
    },
    [],
  );

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Create new category if needed
      let categoryId: number | string = values.property.categoryId;
      if (values.category.name) {
        const response = await propertyService.createCategory({
          name: values.category.name,
        });
        console.log("New category created:", response);
        categoryId = response.id;
      }

      // Step 2: Create property (image already uploaded)
      const propertyData = {
        ...values.property,
        categoryId,
        longitude: Number(values.property.longitude),
        latitude: Number(values.property.latitude),
      };
      const propertyResponse =
        await propertyService.createProperty(propertyData);
      const newPropertyId = propertyResponse.id;
      console.log("Property created successfully:", propertyResponse);

      // Step 3: Create rooms (images already uploaded)
      for (const room of values.rooms) {
        try {
          await propertyService.createRoom(newPropertyId, room);
        } catch (error) {
          console.error(`Error creating room:`, error);
          setError(`Failed to create room: ${room.name}`);
        }
      }

      console.log("Property and rooms created successfully");
      formikHelpers.setSubmitting(false);
      alert("Property and rooms created successfully");
      // TODO: Handle success (e.g., show success message, redirect)
    } catch (error) {
      setError("Failed to create property and rooms");
      console.error("Error submitting form:", error);
      formikHelpers.setSubmitting(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    setCategories,
    isLoading,
    error,
    handleSubmit,
    handleImageUpload,
  };
};
