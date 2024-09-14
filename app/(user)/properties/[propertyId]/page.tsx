import React from "react";
import PropertyDetails from "@/app/(user)/properties/[propertyId]/_components/PropertyDetails";
import axios from "axios";
import { format } from "date-fns";

async function getPropertyDetails(propertyId: number, date: Date) {
  try {
    const formattedDate = format(date, "yyyy-MM-dd");
    const res = await axios.get(
      `http://localhost:8080/api/v1/properties/${propertyId}/available?date=${formattedDate}`,
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
  const date = new Date();
  const propertyId = parseInt(params.propertyId, 10);
  const propertyDetails = await getPropertyDetails(propertyId, date);
  console.log("propertyId", propertyId);
  console.log("propertyDetails", propertyDetails);

  return <PropertyDetails property={propertyDetails} />;
}
