import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAvailabilityCalendar } from "@/hooks/useAvailabilityCalendar";

interface AvailabilityCalendarProps {
  propertyId: number;
  onSelect?: (date: Date | undefined) => void;
  selected?: Date | undefined;
  isCheckOut?: boolean;
  checkInDate?: Date;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  propertyId,
  onSelect,
  selected,
  isCheckOut = false,
  checkInDate,
}) => {
  const { currentMonth, setCurrentMonth, renderDay, isLoading, error } =
    useAvailabilityCalendar(propertyId, isCheckOut, checkInDate);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading availability data</div>;

  // const handleSelect = (date: Date | undefined) => {
  //   console.log("AvailabilityCalendar: Selected date:", date);
  //   onSelect(date);
  // };

  const handleSelect = (date: Date | undefined) => {
    console.log("AvailabilityCalendar: Selected date:", date);
    if (onSelect) {
      onSelect(date);
    }
  };

  const handleCalendarClick = () => {
    console.log("Calendar clicked");
  };

  return (
    <div onClick={handleCalendarClick}>
      <Calendar
        mode="single"
        onMonthChange={setCurrentMonth}
        numberOfMonths={1}
        fromDate={isCheckOut && checkInDate ? checkInDate : new Date()}
        defaultMonth={isCheckOut && checkInDate ? checkInDate : new Date()}
        selected={selected}
        onSelect={handleSelect}
        components={{
          Day: ({ date, ...props }) => {
            const { className, content, disabled } = renderDay(date);
            return (
              <div
                className={className}
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
          // Day: ({ date, ...props }) => {
          //   const { className, content, disabled } = renderDay(date);
          //   return (
          //     <div className={className} {...props} aria-disabled={disabled}>
          //       {content}
          //     </div>
          //   );
          // },
          // Day: ({ date, ...props }) => (
          //   <div
          //     onClick={() => {
          //       console.log("Day clicked:", date);
          //       handleSelect(date);
          //     }}
          //     {...props}
          //   >
          //     {date.getDate()}
          //   </div>
          // ),
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
