"use client";
import React, { useCallback } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/app/dashboard/properties/create/_components/ImageUpload";
import CategoryDropdown from "@/app/dashboard/properties/create/_components/CategoryDropdown";
import MapComponent from "@/components/MapComponent";
import logger from "@/utils/logger";
import { InfoIcon } from "lucide-react";

export interface PropertyFormValues {
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

const propertyFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "city", label: "City", type: "text", disabled: true },
  { name: "country", label: "Country", type: "text", disabled: true },
];

const MapInstructions: React.FC = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 mt-4 text-sm">
      <p className="font-bold">How to set the address:</p>
      <ul className="list-disc list-inside">
        <li>Click on the map to place a marker</li>
        <li>Drag the marker to adjust the location</li>
        <li>The address fields will update automatically</li>
        <li>
          You may edit the &quot;Address&quot; field if address from map is not
          accurate.
        </li>
      </ul>
    </div>
  );
};

const PropertyForm: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<PropertyFormValues>();

  const handleLocationChange = useCallback(
    (
      lat: number,
      lng: number,
      address?: string,
      city?: string,
      country?: string,
    ) => {
      setFieldValue("property.latitude", lat);
      setFieldValue("property.longitude", lng);
      if (address) setFieldValue("property.address", address);
      if (city) setFieldValue("property.city", city);
      if (country) setFieldValue("property.country", country);
      logger.info("Location changed to:", { lat, lng, address, city, country });
    },
    [setFieldValue],
  );

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
              disabled={field.disabled}
            />
            {field.disabled && (
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <InfoIcon size={14} className="mr-1" />
                Use the map to set this field
              </p>
            )}
            <ErrorMessage
              name={`property.${field.name}`}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <CategoryDropdown />
      </div>
      <div className="mt-4 mb-10">
        <Label>Location</Label>
        <MapInstructions />
        <div style={{ height: "400px", width: "100%" }}>
          <MapComponent
            initialCenter={{
              lat: values.property.latitude || 0,
              lng: values.property.longitude || 0,
            }}
            onLocationChange={handleLocationChange}
            isEditable={true}
            viewOnly={false}
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
        <ImageUpload fieldName="property.imageUrl" uploadType="property" />
      </div>
    </div>
  );
};

export default PropertyForm;
