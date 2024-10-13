import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useFetchData = <T>(
  key: string,
  queryFn: () => Promise<T>,
  options?: { enabled?: boolean },
) => {
  const [stateData, setData] = useState<T | null>(null);
  const { data, error, isLoading } = useQuery<T, Error>({
    queryKey: [key],
    queryFn,
    staleTime: 1000 * 60 * 5, // 5 mins
    gcTime: 1000 * 60 * 10, // 10 mins,
    ...options,
  });

  return { data, error, isLoading, setData };
};
