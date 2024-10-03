import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { isSameDay, isBefore } from "date-fns";
import { Button } from "@/components/ui/button";
import { usePriceCalendar } from "@/hooks/utils/usePriceCalendar";
import { Loader2 } from "lucide-react";
import DayComponent from "./DayComponent";

interface PriceCalendarProps {
  propertyId: number;
  onSelect: (date: Date | undefined) => void;
  onReset: () => void;
  onConfirm: () => void;
  isCheckOut: boolean;
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
}

const PriceCalendar: React.FC<PriceCalendarProps> = ({
  propertyId,
  onSelect,
  onReset,
  onConfirm,
  isCheckOut,
  checkInDate,
  checkOutDate,
}) => {
  const { currentMonth, setCurrentMonth, isLoading, error, data } =
    usePriceCalendar(propertyId, isCheckOut, checkInDate);

  const showLoader = isLoading || !data || data.length === 0;

  if (error) return <div>Error loading availability data</div>;

  const selected = isCheckOut ? checkOutDate : checkInDate;
  const defaultMonth = checkInDate || new Date();
  const disabled = (date: Date) => {
    if (isCheckOut && checkInDate) {
      return isBefore(date, checkInDate) || isSameDay(date, checkInDate);
    }
    return isBefore(date, new Date());
  };

  return (
    <div>
      {showLoader ? (
        <Loader2 className="w-10 h-10 text-blue-950 animate-spin" />
      ) : (
        <>
          <Calendar
            mode="single"
            onMonthChange={setCurrentMonth}
            numberOfMonths={1}
            fromDate={new Date()}
            defaultMonth={defaultMonth}
            selected={selected}
            onSelect={onSelect}
            disabled={disabled}
            components={{
              Day: ({ date, ...props }) => (
                <DayComponent
                  date={date}
                  currentMonth={currentMonth}
                  data={data}
                  isCheckOut={isCheckOut}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  onSelect={onSelect}
                  {...props}
                />
              ),
            }}
          />
          {checkOutDate && (
            <div className="flex justify-between">
              <Button onClick={onConfirm} className="bg-green-800">
                Confirm
              </Button>
              <Button onClick={onReset}>Reset</Button>
            </div>
          )}
          <div className="text-xs text-gray-500 mt-2">
            <p>* Estimated lowest price</p>
            <p>* Red dates indicate adjusted rates</p>
            <p>
              {isCheckOut
                ? "* Prices show cumulative total from check-in date"
                : "* Prices are displayed in abbreviated form."}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceCalendar;
