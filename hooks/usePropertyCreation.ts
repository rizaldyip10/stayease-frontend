"use client";
import { useState, useCallback } from "react";
import { FormikHelpers } from "formik";
import axios from "axios";
import propertyService from "@/services/propertyService";

interface Category {
  id: number;
  name: string;
}

interface PropertyFormData {
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
  categoryId: number;
}

interface RoomFormData {
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
  imageUrl: string;
}

interface CategoryFormData {
  name: string;
}

// interface FormValues {
//   property: PropertyFormData;
//   rooms: RoomFormData[];
//   category: CategoryFormData;
// }

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
      const response = await propertyService.getAllCategory();
      setCategories(response);
    } catch (error) {
      setError("Failed to fetch categories");
      console.error("Error fetching categories:", error);
    }
  }, []);

  const handleSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Create new category if needed
      console.log("Form values:", values);
      let categoryId: number | string = values.property.categoryId;
      if (values.category.name) {
        const response = await propertyService.createCategory({
          name: values.category.name,
        });
        console.log("New category created:", response);
        categoryId = response.id;
      }

      // Step 2: Create property
      const propertyData = {
        ...values.property,
        categoryId,
        longitude: Number(values.property.longitude),
        latitude: Number(values.property.latitude),
      };
      const propertyResponse =
        await propertyService.createProperty(propertyData);
      console.log("New property created:", propertyResponse);
      const newPropertyId = propertyResponse.id;

      // Step 3: Create rooms
      for (const room of values.rooms) {
        try {
          await propertyService.createRoom(newPropertyId, room);
        } catch (error) {
          console.error(`Error creating room:`, error);
          setError(`Failed to create room: ${room.name}`);
        }
      }

      // Success
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

  const handleImageUpload = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }, []);

  return {
    categories,
    setCategories,
    isLoading,
    error,
    fetchCategories,
    handleSubmit,
    handleImageUpload,
  };
};
