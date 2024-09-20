import { AvailablePropertyType } from "@/constants/Property";
import { useCallback, useEffect, useState } from "react";
import propertyService from "@/services/propertyService";
import { useDebounce } from "use-debounce";
import { usePropertySearch } from "./usePropertySearch";

export interface FilterOptions {
  city?: string;
  minPrice: number;
  maxPrice?: number;
  startDate?: Date;
  endDate?: Date;
  categoryId?: string;
  searchTerm?: string;
}

export interface SortOption {
  sortBy?: string;
  sortDirection?: string;
}

const initialFilters: FilterOptions = {
  city: "",
  minPrice: 0,
  maxPrice: undefined,
  startDate: undefined,
  endDate: undefined,
  categoryId: "",
  searchTerm: "",
};

export const usePropertyListings = () => {
  const [properties, setProperties] = useState<AvailablePropertyType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [sort, setSort] = useState<SortOption>({
    sortBy: "",
    sortDirection: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 1,
    totalElements: 0,
    size: 10,
  });
  const [debouncedFilters] = useDebounce(filters, 1000);
  const { urlFilters, updateSearchParams, bookingValues } = usePropertySearch();

  useEffect(() => {
    setFilters((prev) => ({ ...prev, ...urlFilters }));
  }, [urlFilters]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSort({ sortBy: "name", sortDirection: "ASC" });
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
    updateSearchParams({});
  }, [updateSearchParams]);

  const fetchPropertyListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await propertyService.sortAndFilter(
        debouncedFilters.startDate,
        debouncedFilters.endDate,
        debouncedFilters.city,
        debouncedFilters.categoryId
          ? Number(debouncedFilters.categoryId)
          : undefined,
        debouncedFilters.searchTerm,
        debouncedFilters.minPrice,
        debouncedFilters.maxPrice,
        pagination.currentPage,
        pagination.size,
        sort.sortBy,
        sort.sortDirection,
      );
      setProperties(result.content);
      setPagination((prev) => ({
        ...prev,
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalElements: result.totalElements,
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedFilters, pagination.currentPage, pagination.size, sort]);

  useEffect(() => {
    fetchPropertyListings();
  }, [fetchPropertyListings]);

  const updateFilters = useCallback(
    (newFilters: Partial<FilterOptions>) => {
      setFilters((prev) => {
        const updatedFilters = { ...prev, ...newFilters };
        updateSearchParams(updatedFilters);
        return updatedFilters;
      });
      setPagination((prev) => ({ ...prev, currentPage: 0 }));
    },
    [updateSearchParams],
  );

  const updateSort = useCallback((newSort: Partial<SortOption>) => {
    setSort((prev) => ({ ...prev, ...newSort }));
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
  }, []);

  const updatePage = useCallback((newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  }, []);

  return {
    properties,
    isLoading,
    error,
    filters,
    sort,
    pagination,
    updateFilters,
    updateSort,
    updatePage,
    resetFilters,
    bookingValues,
  };
};
