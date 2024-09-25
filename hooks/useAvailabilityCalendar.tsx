"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  addDays,
  addMonths,
  endOfDay,
  format,
  isBefore,
  isSameMonth,
  startOfDay,
} from "date-fns";
import rateService from "@/services/rateService";

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
  const endDate = format(endOfDay(addDays(currentMonth, 10)), "yyyy-MM-dd");

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "availabilityCalendar",
      propertyId,
      startDate,
      endDate,
      isCheckOut,
    ],
    queryFn: async () => {
      try {
        let result;
        if (isCheckOut && checkInDate) {
          console.log(
            "Fetching cumulative rates:",
            propertyId,
            checkInDate,
            new Date(endDate),
          );
          result = await rateService.getLowestDailyCumulativeRate(
            propertyId,
            checkInDate,
            new Date(endDate),
          );
        } else {
          console.log(
            "Fetching daily rates:",
            propertyId,
            new Date(startDate),
            new Date(endDate),
          );
          result = await rateService.getLowestDailyRate(
            propertyId,
            new Date(startDate),
            new Date(endDate),
          );
        }
        console.log("API result:", result);
        return result || []; // Ensure we always return an array
      } catch (error) {
        console.error("Error fetching availability data:", error);
        return []; // Return an empty array instead of undefined
      }
    },
    enabled: (!isCheckOut || (isCheckOut && !!checkInDate)) && !!currentMonth,
    staleTime: 1000 * 60 * 5, // 5 mins
  });

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
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

    let className =
      "w-[70px] h-full flex flex-col items-center justify-center border-b border-r border-gray-200";
    if (!isCurrentMonth || isPastDate || isBeforeCheckIn) {
      className += " text-gray-300";
    } else if (dayData) {
      className += " font-bold";
      if (dayData.hasAdjustment) {
        className += " text-red-500";
      } else {
        className += " text-primary";
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
    data,
  };
};
