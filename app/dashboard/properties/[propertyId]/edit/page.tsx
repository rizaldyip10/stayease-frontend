"use client";
import React, { useMemo } from "react";
import UnauthorizedPropertyAccess from "@/app/dashboard/properties/[propertyId]/edit/_components/UnauthorizedProperty";
import PropertyEdit from "@/app/dashboard/properties/[propertyId]/edit/_components/PropertyEdit";
import GlobalLoading from "@/components/GlobalLoading";
import { usePropertyData } from "@/hooks/properties/usePropertyData";

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
