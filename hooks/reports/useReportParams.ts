"use client";

import {useCallback, useEffect, useState} from "react";
import {ReportsQueryType} from "@/constants/Reports";
import {useSearchParams, useRouter} from "next/navigation";

export const useReportParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reportParams, setReportParams] = useState<ReportsQueryType>({
      year: null,
      month: null,
      propertyId: null,
  });

  useEffect(() => {
      const query = new URLSearchParams(searchParams);
      const year = query.get("year");
      const month = query.get("month");
      const propertyId = query.get("propertyId");
      
      setReportParams(prev => ({ 
          ...prev,
          year: year || null,
          month: month || null,
          propertyId: propertyId ? +propertyId : null,
      }));
  }, [searchParams]);

    const handleParamsChange = useCallback((newFilter: Partial<ReportsQueryType>) => {
        setReportParams((prevFilters) => {
            const updatedFilters = { ...prevFilters, ...newFilter };
            const params = new URLSearchParams();

            Object.entries(updatedFilters).forEach(([key, value]) => {
                if (value !== null && value !== undefined && value !== '') {
                    params.set(key, value.toString());
                }
            });

            router.push(`?${params.toString()}`);
            return updatedFilters;
        });
    }, [router]);

  return { reportParams, handleParamsChange };
};