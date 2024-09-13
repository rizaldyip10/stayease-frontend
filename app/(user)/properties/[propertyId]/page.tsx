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

  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/properties/${propertyId}`,
    );
    return res.data.data;
  } catch (error) {
    console.error("Error fetching property details:", error);
    return undefined;
  }
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const propertyId = parseInt(params.propertyId, 10);
  const propertyDetails = await getPropertyDetails(propertyId);
  console.log("propertyId", propertyId);
  console.log("propertyDetails", propertyDetails);

  return <PropertyDetails property={propertyDetails} />;
}
