import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AvailablePropertyType } from "@/constants/Property";
import Image from "next/image";
import Link from "next/link";
import { useBookingValues } from "@/hooks/useBookingValues";

interface PropertyCardProps {
  property: AvailablePropertyType;
}

const PropertyListingCard: React.FC<PropertyCardProps> = (property) => {
  const {
    propertyId,
    imageUrl,
    propertyName,
    address,
    tenant,
    lowestAdjustedPrice,
  } = property.property;

  const { bookingValues } = useBookingValues();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Construct the URL with the date range
  const propertyUrl = `/properties/${propertyId}?${new URLSearchParams(
    Object.fromEntries(
      Object.entries(bookingValues).filter(
        ([key, value]) => value !== null && value !== undefined,
      ),
    ),
  ).toString()}`;

  return (
    <Link href={propertyUrl} passHref>
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer">
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={`${propertyName}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{propertyName}</h3>
            <span className="text-xs text-gray-500">By: {tenant}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{address}</p>
          <p className="text-lg font-bold">
            <span className="text-xs font-light">Starts from </span>
            {formatPrice(lowestAdjustedPrice)}
            <span className="text-xs font-light"> / night</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyListingCard;
