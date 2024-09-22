import React from "react";
import PropertyEditForm from "./PropertyEditForm";
import { usePropertyEdit } from "@/hooks/properties/usePropertyEdit";

interface PropertyEditProps {
  propertyId: number;
}
const PropertyEdit: React.FC<PropertyEditProps> = ({ propertyId }) => {
  const {
    property,
    rooms,
    isLoading,
    error,
    handleSubmit,
  } = usePropertyEdit(propertyId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">Edit Property</h1>
      <PropertyEditForm
        property={property}
        rooms={rooms}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default PropertyEdit;
