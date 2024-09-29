import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FilterOptions } from "@/hooks/properties/usePropertyListings";
import { isValid, parseISO } from "date-fns";
import { buildSearchParams, buildUrl } from "@/utils/urlBuilder";

export const usePropertySearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [urlFilters, setUrlFilters] = useState<Partial<FilterOptions>>({});

  const initializeFiltersFromURL = useCallback(() => {
    setUrlFilters(getFilterFromParams(searchParams));
  }, [searchParams, setUrlFilters]);

  useEffect(() => {
    initializeFiltersFromURL();
  }, [initializeFiltersFromURL]);

  const updateSearchParams = useCallback(
    (filters: Partial<FilterOptions>) => {
      const newSearchParams = buildSearchParams(filters);
      return newSearchParams;
    },
    [router],
  );

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

  return { urlFilters, handleRedirect, updateSearchParams };
};

const parseDate = (dateString: string | null): Date | undefined => {
  if (!dateString) return undefined;
  const parsedDate = parseISO(dateString);
  return isValid(parsedDate) ? parsedDate : undefined;
};

const getFilterFromParams = (
  searchParams: URLSearchParams,
): Partial<FilterOptions> => {
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
  newFilters.startDate = parseDate(startDate);
  newFilters.endDate = parseDate(endDate);
  if (categoryId) newFilters.categoryId = categoryId;
  if (searchTerm) newFilters.searchTerm = searchTerm;

  return newFilters;
};
