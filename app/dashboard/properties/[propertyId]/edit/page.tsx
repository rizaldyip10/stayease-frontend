"use client";
import React, { useMemo } from "react";
import UnauthorizedPropertyAccess from "@/app/dashboard/properties/create/_components/property-forms/UnauthorizedProperty";
import GlobalLoading from "@/components/GlobalLoading";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import PropertyEdit from "@/app/dashboard/properties/[propertyId]/edit/_components/PropertyEdit";

export default function PropertyEditPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const propertyId = useMemo(
    () => parseInt(params.propertyId, 10),
    [params.propertyId],
  );

  const { isOwner, isLoading, error } = usePropertyData(propertyId);

  if (isOwner === null || isLoading) {
    return (
      <div className="flex items-center justify-center align-middle h-[200px]">
        <GlobalLoading height={100} width={100} />
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div>
        <UnauthorizedPropertyAccess />
      </div>
    );
  }

  return (
    <div>
      <PropertyEdit propertyId={propertyId} />
    </div>
  );
}
