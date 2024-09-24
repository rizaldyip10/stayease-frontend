import React, { useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAvailabilityCalendar } from "@/hooks/useAvailabilityCalendar";
import { isSameDay, isAfter, isBefore, addDays } from "date-fns";
import { Button } from "@/components/ui/button"; // Import your Button component

interface AvailabilityCalendarProps {
  propertyId: number;
  onSelect: (date: Date | undefined) => void;
  onReset: () => void;
  onConfirm: () => void;
  selected?: Date | undefined;
  isCheckOut: boolean;
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  onDateChange: (date: Date) => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  propertyId,
  onSelect,
  onReset,
  onConfirm,
  selected,
  isCheckOut,
  checkInDate,
  checkOutDate,
  onDateChange,
}) => {
  const { currentMonth, setCurrentMonth, renderDay, isLoading, error } =
    useAvailabilityCalendar(propertyId, isCheckOut, checkInDate);

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      console.log("RoomAvailabilityCalendar: Selected date:", date);
      onSelect(date);
      if (date) {
        onDateChange(date);
      }
    },
    [onSelect, onDateChange],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading availability data</div>;

  return (
    <div>
      <Calendar
        mode="single"
        onMonthChange={setCurrentMonth}
        numberOfMonths={1}
        fromDate={new Date()}
        defaultMonth={checkInDate || new Date()}
        selected={selected}
        onSelect={handleSelect}
        disabled={(date) => {
          if (isCheckOut && checkInDate) {
            return isBefore(date, checkInDate) || isSameDay(date, checkInDate);
          }
          return isBefore(date, new Date());
        }}
        components={{
          Day: ({ date, ...props }) => {
            const { className, content, disabled } = renderDay(date);
            const isSelected = checkInDate && isSameDay(date, checkInDate);
            const isInRange =
              checkInDate &&
              checkOutDate &&
              isAfter(date, checkInDate) &&
              isBefore(date, addDays(checkOutDate, 1));

            let dayClassName = className;
            if (isSelected)
              dayClassName += " bg-primary text-primary-foreground";
            if (isInRange)
              dayClassName += " bg-primary/50 text-primary-foreground";

            return (
              <div
                className={dayClassName}
                {...props}
                aria-disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) {
                    console.log("Day clicked:", date);
                    handleSelect(date);
                  }
                }}
              >
                {content}
              </div>
            );
          },
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
        <p>* Bold dates have available prices</p>
        <p>* Red dates indicate adjusted rates</p>
        <p>
          {isCheckOut
            ? "* Prices show cumulative total from check-in date"
            : "* Prices are shown in thousands (e.g., 800 = 800,000)"}
        </p>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
