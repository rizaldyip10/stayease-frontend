"use client";
import React, { useCallback, useMemo, useState } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import ImageUpload from "@/app/dashboard/properties/create/_components/ImageUpload";
import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import CategoryDropdown from "@/app/dashboard/properties/create/_components/CategoryDropdown";
import propertyService from "@/services/propertyService";
import { CategoryType } from "@/constants/Property";
import MapComponent from "@/app/dashboard/properties/create/_components/MapComponent";

interface PropertyFormValues {
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
}

interface PropertyFormProps {
  onImageUpload: (file: File) => Promise<string>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  categories: CategoryType[];
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  onImageUpload,
  categories,
  setCategories,
}) => {
  const { values, setFieldValue } = useFormikContext<PropertyFormValues>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const propertyFields = useMemo(
    () => [
      { name: "name", label: "Name", type: "text" },
      { name: "description", label: "Description", type: "text" },
      { name: "address", label: "Address", type: "text" },
      { name: "city", label: "City", type: "text" },
      { name: "country", label: "Country", type: "text" },
    ],
    [],
  );

  const handleLocationChange = useCallback(
    (lat: number, lng: number) => {
      setFieldValue("property.latitude", lat);
      setFieldValue("property.longitude", lng);
      console.log("Location changed to:", lat, lng);
    },
    [setFieldValue],
  );

  const handleCategorySelect = useCallback((categoryId: string | number) => {
    setSelectedCategory(Number(categoryId));
  }, []);

  const handleCreateNewCategory = useCallback(async (categoryName: string) => {
    try {
      const newCategory = await propertyService.createCategory({
        name: categoryName,
      });
      setSelectedCategory(newCategory.id);
    } catch (error) {
      console.error("Failed to create new category:", error);
    }
  }, []);

  const MemoizedMapComponent = useMemo(() => React.memo(MapComponent), []);

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Property Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {propertyFields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={`property.${field.name}`}>{field.label}</Label>
            <Field
              name={`property.${field.name}`}
              as={Input}
              type={field.type}
            />
            <ErrorMessage
              name={`property.${field.name}`}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <CategoryDropdown
          onSelect={handleCategorySelect}
          onCreateNew={handleCreateNewCategory}
          categories={categories}
          setCategories={setCategories}
        />
      </div>
      <div className="mt-4">
        <Label>Location</Label>
        <div style={{ height: "400px", width: "100%" }}>
          <MemoizedMapComponent
            initialCenter={{
              lat: values.property.latitude || 0,
              lng: values.property.longitude || 0,
            }}
            onLocationChange={handleLocationChange}
          />
        </div>
        <ErrorMessage
          name="property.latitude"
          component="div"
          className="text-red-500"
        />
        <ErrorMessage
          name="property.longitude"
          component="div"
          className="text-red-500"
        />
      </div>
      <div className="mt-4">
        <Label>Property Image</Label>
        <ImageUpload name="property.imageUrl" onImageUpload={onImageUpload} />
      </div>
    </div>
  );
};

export default PropertyForm;
