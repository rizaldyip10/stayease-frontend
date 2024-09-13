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
  isAfter,
} from "date-fns";

export const useAvailabilityCalendar = (
  propertyId: number,
  isCheckOut: boolean = false,
  checkInDate?: Date,
) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startDate =
    isCheckOut && checkInDate
      ? format(checkInDate, "yyyy-MM-dd")
      : format(startOfDay(currentMonth), "yyyy-MM-dd");
  const endDate = format(endOfDay(addMonths(currentMonth, 1)), "yyyy-MM-dd");

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "availabilityCalendar",
      propertyId,
      startDate,
      endDate,
      isCheckOut,
    ],
    queryFn: async () => {
      if (isCheckOut && checkInDate) {
        return await propertyService.getLowestDailyCumulativeRate(
          propertyId,
          checkInDate,
          new Date(endDate),
        );
      } else {
        return await propertyService.getLowestDailyRate(
          propertyId,
          new Date(startDate),
          new Date(endDate),
        );
      }
    },
    enabled: !isCheckOut || (isCheckOut && !!checkInDate),
  });

  const formatPrice = (price: number) => {
    const thousands = Math.round(price / 1000);
    return `${thousands}`;
  };

  const renderDay = (day: Date) => {
    const dateString = format(day, "yyyy-MM-dd");
    const dayData = data?.find((a: any) => a.date === dateString);
    const isCurrentMonth = isSameMonth(day, currentMonth);
    const isPastDate = isBefore(day, startOfDay(new Date()));
    const isBeforeCheckIn =
      isCheckOut && checkInDate && isBefore(day, checkInDate);

    let className = "w-full h-full flex flex-col items-center justify-center";
    if (!isCurrentMonth || isPastDate || isBeforeCheckIn) {
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
          {dayData && isCurrentMonth && !isPastDate && !isBeforeCheckIn && (
            <div className="text-xs">{formatPrice(dayData.lowestPrice)}</div>
          )}
        </>
      ),
      disabled: isPastDate || isBeforeCheckIn,
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
