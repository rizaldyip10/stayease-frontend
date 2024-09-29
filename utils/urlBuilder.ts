import { FilterOptions } from "@/hooks/properties/usePropertyListings";
import { format } from "date-fns";

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
