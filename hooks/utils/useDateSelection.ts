import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import { useCallback, useEffect, useState } from "react";
import { format, isValid } from "date-fns";
import { usePropertySearch } from "@/hooks/properties/usePropertySearch";

export const useDateSelection = ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) => {
  const { updateSearchParams, resetFilters } = usePropertySearch();
  const { bookingValues, setBookingInfo } = useBookingValues();

  const [checkInDate, setCheckInDate] = useState<Date | undefined>(() =>
    startDate ? new Date(startDate) : undefined,
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() =>
    endDate ? new Date(endDate) : undefined,
  );
  const [isSelectingCheckOut, setIsSelectingCheckOut] =
    useState<boolean>(false);

  // Update local state when bookingValues change
  useEffect(() => {
    if (bookingValues.checkInDate) {
      setCheckInDate(new Date(bookingValues.checkInDate));
    }
    if (bookingValues.checkOutDate) {
      setCheckOutDate(new Date(bookingValues.checkOutDate));
    }
  }, [bookingValues.checkInDate, bookingValues.checkOutDate]);

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (!isSelectingCheckOut) {
        if (date && checkInDate && date.getTime() === checkInDate.getTime()) {
          setCheckInDate(undefined);
          setCheckOutDate(undefined);
          setIsSelectingCheckOut(false);
          setBookingInfo({ checkInDate: null, checkOutDate: undefined });
          updateSearchParams({ startDate: undefined, endDate: undefined });
        } else {
          setCheckInDate(date);
          setCheckOutDate(undefined);
          setIsSelectingCheckOut(true);
          if (date && isValid(date)) {
            const formattedDate = format(date, "yyyy-MM-dd");
            setBookingInfo({
              checkInDate: formattedDate,
              checkOutDate: undefined,
            });
            updateSearchParams({ startDate: date });
          }
        }
      } else {
        setCheckOutDate(date);
        setIsSelectingCheckOut(false);
        if (date && isValid(date)) {
          const formattedDate = format(date, "yyyy-MM-dd");
          setBookingInfo({ checkOutDate: formattedDate });
          updateSearchParams({ startDate: checkInDate, endDate: date });
        }
      }
    },
    [isSelectingCheckOut, checkInDate, setBookingInfo],
  );

  const handleReset = useCallback(() => {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setIsSelectingCheckOut(false);
    setBookingInfo({ checkInDate: null, checkOutDate: undefined });
    resetFilters();
  }, [setBookingInfo]);

  return {
    checkInDate,
    checkOutDate,
    isSelectingCheckOut,
    handleDateSelect,
    handleReset,
  };
};
