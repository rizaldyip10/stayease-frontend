import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FilterOptions } from "@/hooks/properties/usePropertyListings";
import { isValid, parseISO } from "date-fns";
import { buildUrl } from "@/utils/urlBuilder";

export const usePropertySearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [urlFilters, setUrlFilters] = useState<Partial<FilterOptions>>({});

  const initializeFiltersFromURL = useCallback(() => {
    const newFilters: Partial<FilterOptions> = {};
    const city = searchParams.get("city");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const categoryId = searchParams.get("categoryId");
    const searchTerm = searchParams.get("searchTerm");

    if (city) newFilters.city = city;
    if (minPrice) newFilters.minPrice = parseInt(minPrice);
    if (maxPrice) newFilters.maxPrice = parseInt(maxPrice);
    if (startDate) {
      const parsedStartDate = parseISO(startDate);
      if (isValid(parsedStartDate)) {
        newFilters.startDate = parsedStartDate;
      }
    }
    if (endDate) {
      const parsedEndDate = parseISO(endDate);
      if (isValid(parsedEndDate)) {
        newFilters.endDate = parsedEndDate;
      }
    }
    if (categoryId) newFilters.categoryId = categoryId;
    if (searchTerm) newFilters.searchTerm = searchTerm;

    setUrlFilters(newFilters);
  }, [searchParams, setUrlFilters]);

  useEffect(() => {
    initializeFiltersFromURL();
  }, [initializeFiltersFromURL]);

  const handleRedirect = useCallback(
    (
      filters: Partial<FilterOptions>,
      basePath: string,
      propertyId?: string,
      roomId?: string,
    ) => {
      const newUrl = buildUrl(basePath, filters, { propertyId, roomId });
      router.push(newUrl);
    },
    [router],
  );

  return { urlFilters, handleRedirect };
};
