import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAvailabilityCalendar } from "@/hooks/useAvailabilityCalendar";
import { isSameDay, isAfter, isBefore, addDays } from "date-fns";

interface AvailabilityCalendarProps {
  propertyId: number;
  onSelect: (date: Date | undefined) => void;
  selected?: Date | undefined;
  isCheckOut: boolean;
  checkInDate: Date | null;
  checkOutDate: Date | null;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  propertyId,
  onSelect,
  selected,
  isCheckOut,
  checkInDate,
  checkOutDate,
}) => {
  const { currentMonth, setCurrentMonth, renderDay, isLoading, error } =
    useAvailabilityCalendar(propertyId, isCheckOut, checkInDate);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading availability data</div>;

  const handleSelect = (date: Date | undefined) => {
    console.log("AvailabilityCalendar: Selected date:", date);
    onSelect(date);
  };

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
              isBefore(date, checkOutDate);

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
