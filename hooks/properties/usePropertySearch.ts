import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FilterOptions } from "@/hooks/properties/usePropertyListings";
import { format, isValid, parseISO } from "date-fns";

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

  const updateSearchParams = useCallback((filters: Partial<FilterOptions>) => {
    const newSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (value instanceof Date) {
          const dateString = format(value, "yyyy-MM-dd");
          newSearchParams.set(key, dateString);
        } else {
          newSearchParams.set(key, value.toString());
        }
      }
    });
    return newSearchParams;
  }, []);

  const handleSearch = useCallback(
    (filters: Partial<FilterOptions>) => {
      console.log("Search filters:", filters);
      const newSearchParams = updateSearchParams(filters);
      const newUrl = `/properties?${newSearchParams.toString()}`;
      console.log("New URL:", newUrl);
      router.push(newUrl);
    },
    [updateSearchParams, router],
  );

  return { urlFilters, updateSearchParams, handleSearch };
};
