import { useBookingValues } from "@/hooks/transactions/useBookingValues";
import { useCallback, useState, useEffect } from "react";
import { format, isValid } from "date-fns";

export const useDateSelection = ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) => {
  const { bookingValues, setBookingInfo } = useBookingValues();
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    startDate ? new Date(startDate) : new Date(),
  );
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(() =>
    startDate ? new Date(startDate) : undefined,
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() =>
    endDate ? new Date(endDate) : undefined,
  );
  const [isSelectingCheckOut, setIsSelectingCheckOut] =
    useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  // Update local state when bookingValues change
  useEffect(() => {
    if (bookingValues.checkInDate) {
      setCheckInDate(new Date(bookingValues.checkInDate));
      setSelectedDate(new Date(bookingValues.checkInDate));
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
            setSelectedDate(date);
          }
        }
      } else {
        setCheckOutDate(date);
        setIsSelectingCheckOut(false);
        if (date && isValid(date)) {
          const formattedDate = format(date, "yyyy-MM-dd");
          setBookingInfo({ checkOutDate: formattedDate });
        }
      }
    },
    [isSelectingCheckOut, checkInDate, setBookingInfo],
  );

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleReset = useCallback(() => {
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setIsSelectingCheckOut(false);
    setBookingInfo({ checkInDate: null, checkOutDate: undefined });
    setSelectedDate(new Date());
  }, [setBookingInfo]);

  const handleConfirm = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  return {
    selectedDate,
    checkInDate,
    checkOutDate,
    isSelectingCheckOut,
    isCalendarOpen,
    handleDateSelect,
    handleDateChange,
    handleReset,
    handleConfirm,
    setIsCalendarOpen,
  };
};
