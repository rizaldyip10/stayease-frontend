"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import propertyService from "@/services/propertyService";
import UnauthorizedPropertyAccess from "@/app/dashboard/properties/[propertyId]/edit/_components/UnauthorizedProperty";
import PropertyEdit from "@/app/dashboard/properties/[propertyId]/edit/_components/PropertyEdit";
import GlobalLoading from "@/components/GlobalLoading";

export default function PropertyEditPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const propertyId = useMemo(
    () => parseInt(params.propertyId, 10),
    [params.propertyId],
  );
  console.log("propertyId", propertyId);
  console.log("session", session);

  useEffect(() => {
    async function checkOwnership() {
      const owner = await isPropertyOwner(propertyId);
      console.log("type of propertyId", typeof propertyId);
      setIsOwner(owner);
    }
    checkOwnership();
  }, [propertyId]);

  useEffect(() => {
    async function fetchData() {
      const response = await propertyService.getPropertyById(propertyId);
      console.log("response", response);
    }
    fetchData();
  }, [propertyId]);

  async function isPropertyOwner(propertyId: number): Promise<boolean> {
    let isOwner;
    try {
      isOwner = await propertyService.checkPropertyOwnership(propertyId);
    } catch (error) {
      console.log("error", error);
      return false;
    }
    return isOwner;
  }

  if (isOwner === null) {
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
