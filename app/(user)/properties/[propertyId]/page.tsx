import React from "react";
import { notFound } from "next/navigation";
import PropertyDetails from "@/app/(user)/properties/[propertyId]/_components/PropertyDetails";
import axios from "axios";

async function getPropertyDetails(propertyId: number) {
  // TODO : fetch property details from API
  // const res = await fetch(`http://your-api-url/properties/${propertyId}`, {
  //   next: { revalidate: 60 },
  // });
  // if (!res.ok) return undefined;
  // return res.json();

  // !! MOCK DATA TODO: Replace this with actual API call
  return {
    id: 1,
    tenant: "John Doe",
    category: "Apartment",
    propertyName: "Ocean Breeze Apartment",
    description: "A cozy apartment with a beautiful ocean view.",
    imageUrl: "https://example.com/ocean-breeze.jpg",
    address: "123 Beach Road",
    city: "Miami",
    country: "USA",
    latitude: 25.7617,
    longitude: -80.1918,
    rooms: [
      {
        id: 1,
        name: "Ocean View Suite",
        description: "Spacious suite with a stunning view of the ocean.",
        imageUrl: "https://example.com/ocean-view-suite.jpg",
        basePrice: 200,
        capacity: 2,
        propertySummary: {
          propertyId: 1,
          propertyName: "Ocean Breeze Apartment",
        },
      },
      {
        id: 2,
        name: "Sunset Suite",
        description: "Suite with a perfect view of the sunset over the beach.",
        imageUrl: "https://example.com/sunset-suite.jpg",
        basePrice: 180,
        capacity: 2,
        propertySummary: {
          propertyId: 1,
          propertyName: "Ocean Breeze Apartment",
        },
      },
    ],
  };
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const propertyId = parseInt(params.propertyId, 10);
  const propertyDetails = await getPropertyDetails(propertyId);

  if (!propertyDetails) {
    notFound();
  }

  return <PropertyDetails property={propertyDetails} />;
}
