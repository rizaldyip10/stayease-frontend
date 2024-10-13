import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { isValid, parseISO, startOfDay } from "date-fns";
import { CustomDatePicker } from "@/components/CustomDatePicker";

interface CheckInCalendarProps {
  bookingValues: {
    checkInDate: string | null;
    checkOutDate: string | null;
  };
  handleDateSelect: (
    field: "checkInDate" | "checkOutDate",
  ) => (date: Date | undefined) => void;
  resetFilters: () => void;
}

const CheckInCalendar: React.FC<CheckInCalendarProps> = ({
  bookingValues,
  handleDateSelect,
  resetFilters,
}) => {
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const handleCheckInSelect = (date: Date | undefined) => {
    handleDateSelect("checkInDate")(date);
    setIsCheckInOpen(false);
    setIsCheckOutOpen(true);
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    handleDateSelect("checkOutDate")(date);
    setIsCheckOutOpen(false);
  };

  const parseDate = useCallback(
    (dateString: string | null): Date | undefined => {
      if (!dateString) return undefined;
      const date = parseISO(dateString);
      return isValid(date) ? date : undefined;
    },
    [],
  );

  const minDate = startOfDay(new Date());
  const endMinDate = new Date(bookingValues.checkInDate || minDate);
  const checkInDate = parseDate(bookingValues.checkInDate);
  const checkOutDate = parseDate(bookingValues.checkOutDate);

  return (
    <>
      <div className="space-y-4 mb-4">
        <CustomDatePicker
          title="Check-in Date"
          date={checkInDate}
          onDateChange={handleCheckInSelect}
          minDate={minDate}
          open={isCheckInOpen}
          setOpen={setIsCheckInOpen}
        />
        <CustomDatePicker
          title="Check-out Date"
          date={checkOutDate}
          onDateChange={handleCheckOutSelect}
          minDate={endMinDate}
          open={isCheckOutOpen}
          setOpen={setIsCheckOutOpen}
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant="link"
          onClick={resetFilters}
          className="underline -mt-5 text-xs"
        >
          Reset dates
        </Button>
      </div>
    </>
  );
};

export default CheckInCalendar;
