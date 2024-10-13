import React, { useCallback } from "react";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MapComponent from "@/components/MapComponent";
import { InfoIcon } from "lucide-react";
import CategoryDropdown from "@/app/dashboard/properties/create/_components/property-forms/CategoryDropdown";
import ImageUpload from "@/app/dashboard/properties/create/_components/property-forms/ImageUpload";
import logger from "@/utils/logger";
import MapInstructions from "@/app/dashboard/properties/create/_components/property-forms/MapInstructions";

interface PropertyFormFieldsProps {
  isEditing: boolean;
}

const LocationFieldInfo: React.FC = () => {
  return (
    <p className="text-sm text-gray-500 mt-1 flex items-center">
      <InfoIcon size={14} className="mr-1" />
      Use the map to set this field
    </p>
  );
};

const PropertyFormFields: React.FC<PropertyFormFieldsProps> = ({
  isEditing,
}) => {
  const { values, setFieldValue } = useFormikContext<any>();

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

  const locationTitle = isEditing ? "Location (Non-Editable)" : "Location";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="property.name">Name</Label>
          <Field name="property.name" as={Input} />
          <ErrorMessage
            name="property.name"
            component="div"
            className="text-red-500"
          />
        </div>
        <CategoryDropdown
          initialCategoryId={isEditing ? values.property.categoryId : 0}
        />
      </div>

      <div>
        <Label htmlFor="property.description">Description</Label>
        <Field name="property.description" as={Textarea} className="h-24" />
        <ErrorMessage
          name="property.description"
          component="div"
          className="text-red-500"
        />
      </div>

      <div>
        <Label>Property Image</Label>
        <ImageUpload fieldName="property.imageUrl" uploadType="property" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>{locationTitle}</Label>
          {!isEditing && <MapInstructions />}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["address", "city", "country"].map((field) => (
            <div key={field}>
              <Label htmlFor={`property.${field}`}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                name={`property.${field}`}
                value={values.property[field]}
                onChange={(e) =>
                  setFieldValue(`property.${field}`, e.target.value)
                }
                disabled={isEditing || field !== "address"}
                className={
                  isEditing || field !== "address" ? "bg-gray-100" : ""
                }
              />
              {!isEditing && field !== "address" && <LocationFieldInfo />}
            </div>
          ))}
        </div>
        <div style={{ height: "400px", width: "100%" }}>
          <MapComponent
            initialCenter={{
              lat: values.property.latitude || 0,
              lng: values.property.longitude || 0,
            }}
            onLocationChange={!isEditing ? handleLocationChange : () => {}}
            isEditable={!isEditing}
            viewOnly={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyFormFields;
