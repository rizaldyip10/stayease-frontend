import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AvailablePropertyType } from "@/constants/Property";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  const searchParams = useSearchParams();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Get the current date range from the search params
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");

  // Construct the URL with the date range
  const propertyUrl = `/properties/${propertyId}${checkInDate ? `?checkInDate=${checkInDate}` : ""}${checkInDate && checkOutDate ? `&checkOutDate=${checkOutDate}` : ""}`;

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
