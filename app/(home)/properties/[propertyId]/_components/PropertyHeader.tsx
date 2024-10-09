import React from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { CurrentAvailablePropertyType } from "@/constants/Property";

interface PropertyHeaderProps {
  property: CurrentAvailablePropertyType;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{property.propertyName}</h1>
      <div className="flex items-center mb-4">
        <div className="flex items-center mb-2 text-sm text-gray-500">
          <MapPin className="mr-2" size={16} />
          <span>{property.address}</span>
        </div>
      </div>
      <Image
        src={property.imageUrl || "/api/placeholder/800/400"}
        alt={property.propertyName}
        width={800}
        height={400}
        className="w-full h-64 object-cover mb-4 rounded"
      />
    </>
  );
};

export default PropertyHeader;
