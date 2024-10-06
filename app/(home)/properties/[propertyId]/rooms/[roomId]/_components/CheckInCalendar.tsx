import React, { useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, isValid, parseISO } from "date-fns";

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
  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return null;
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "PPP") : null;
  }, []);

  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);

  const endMinDate = new Date(bookingValues.checkInDate || minDate);
  console.log("endMinDate", endMinDate);

  const buttonTitle = (date: string | null, title: string) => {
    return date ? formatDate(date) : title;
  };

  return (
    <>
      <div className="space-y-4 mb-4">
        <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-auto">
                {buttonTitle(bookingValues.checkInDate, "Check-in Date")}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                bookingValues.checkInDate
                  ? parseISO(bookingValues.checkInDate)
                  : undefined
              }
              onSelect={handleCheckInSelect}
              initialFocus
              disabled={(date) => date < minDate}
            />
          </PopoverContent>
        </Popover>
        <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <span className="mr-auto">
                {buttonTitle(bookingValues.checkOutDate, "Check-out Date")}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={addDays(endMinDate, 1)}
              onSelect={handleCheckOutSelect}
              initialFocus
              disabled={(date) => date < endMinDate}
            />
          </PopoverContent>
        </Popover>
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
