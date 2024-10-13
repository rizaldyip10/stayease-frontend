import { format } from "date-fns";

export const dateFormater = (date: string) => {
  return new Date(date).toLocaleDateString("en-EN", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
};

export const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");
