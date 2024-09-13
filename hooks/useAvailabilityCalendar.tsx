"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import propertyService from "@/services/propertyService";
import {
  addMonths,
  format,
  startOfDay,
  endOfDay,
  isSameMonth,
  isBefore,
} from "date-fns";

export const useAvailabilityCalendar = (propertyId: number) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDate = format(startOfDay(currentMonth), "yyyy-MM-dd");
  const endDate = format(endOfDay(addMonths(currentMonth, 1)), "yyyy-MM-dd");

  const { data, error, isLoading } = useQuery({
    queryKey: ["availabilityCalendar", propertyId, startDate, endDate],
    queryFn: async () => {
      return await propertyService.getLowestDailyRate(
        propertyId,
        new Date(startDate),
        new Date(endDate),
      );
    },
  });

  const formatPrice = (price: number) => {
    const thousands = Math.floor(price / 1000);
    return `${thousands}k`;
  };

  const renderDay = (day: Date) => {
    const dateString = format(day, "yyyy-MM-dd");
    const dayData = data?.find((a: any) => a.date === dateString);
    const isCurrentMonth = isSameMonth(day, currentMonth);
    const isPastDate = isBefore(day, startOfDay(new Date()));

    let className = "w-full h-full flex flex-col items-center justify-center";
    if (!isCurrentMonth || isPastDate) {
      className += " text-gray-300";
    } else if (dayData) {
      className += " font-bold";
      if (dayData.hasAdjustment) {
        className += " text-red-500";
      }
    }

    return {
      className,
      content: (
        <>
          <div>{format(day, "d")}</div>
          {dayData && isCurrentMonth && !isPastDate && (
            <div className="text-xs">{formatPrice(dayData.lowestPrice)}</div>
          )}
        </>
      ),
    };
  };

  return {
    currentMonth,
    setCurrentMonth,
    renderDay,
    isLoading,
    error,
  };
};
