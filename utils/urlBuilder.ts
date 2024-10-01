import { FilterOptions } from "@/hooks/properties/usePropertyListings";
import { format, isValid, parseISO } from "date-fns";

const parseDate = (dateString: string | null): Date | undefined => {
  if (!dateString) return undefined;
  const parsedDate = parseISO(dateString);
  return isValid(parsedDate) ? parsedDate : undefined;
};
export const buildUrl = (
  basePath: string,
  filters: Partial<FilterOptions>,
  params: Record<string, string | undefined> = {},
) => {
  const newSearchParams = buildSearchParams(filters);

  let url = basePath;
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url = url.replace(`{${key}}`, value);
    }
  });

  return `${url}?${newSearchParams.toString()}`;
};

export const buildSearchParams = (
  filters: Partial<FilterOptions>,
): URLSearchParams => {
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
};

export const getFilterFromParams = (
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
