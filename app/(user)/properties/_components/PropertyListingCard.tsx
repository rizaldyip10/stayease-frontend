import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyType } from "@/constants/Property";

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyListingCard: React.FC<PropertyCardProps> = (property) => {
  const { imageUrl, propertyName, address, rooms } = property.property;
  return (
    <Card>
      <img
        src={imageUrl}
        alt={propertyName}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{propertyName}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">{address}</p>
        <p className="text-lg font-bold">
          <span className="text-xs font-light">Starts from </span>€{" "}
          {rooms[0].roomBasePrice}
        </p>
      </CardContent>
    </Card>
  );
};

export default PropertyListingCard;
