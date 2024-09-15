import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyAndRoomType, PropertyType } from "@/constants/Property";
import Image from "next/image";

interface PropertyCardProps {
  property: PropertyAndRoomType;
}

const PropertyListingCard: React.FC<PropertyCardProps> = (property) => {
  const { imageUrl, propertyName, address, rooms, tenant } = property.property;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const lowestPrice = rooms && rooms.length > 0 ? rooms[0]?.basePrice : 0;

  return (
    <Card className="overflow-hidden">
      <Image
        src={imageUrl}
        alt={`${propertyName}`}
        width={300}
        height={200}
        className="w-full h-48 object-cover overflow-hidden"
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{propertyName}</h3>
          <span className="text-xs text-gray-500">By: {tenant}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{address}</p>
        <p className="text-lg font-bold">
          <span className="text-xs font-light">Starts from </span>
          {formatPrice(lowestPrice)}
          <span className="text-xs font-light"> / night</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default PropertyListingCard;
