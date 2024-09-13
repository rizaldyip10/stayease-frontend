import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { useAvailabilityCalendar } from "@/hooks/useAvailabilityCalendar";

interface AvailabilityCalendarProps {
  propertyId: number;
  onSelect?: (date: Date | undefined) => void;
  selected?: Date | undefined;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  propertyId,
  onSelect,
  selected,
}) => {
  const { currentMonth, setCurrentMonth, renderDay, isLoading, error } =
    useAvailabilityCalendar(propertyId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading availability data</div>;

  return (
    <div>
      <Calendar
        mode="single"
        onMonthChange={setCurrentMonth}
        numberOfMonths={1}
        fromDate={new Date()}
        defaultMonth={new Date()}
        selected={selected}
        onSelect={onSelect}
        components={{
          Day: ({ date, ...props }) => {
            const { className, content } = renderDay(date);
            return (
              <div className={className} {...props}>
                {content}
              </div>
            );
          },
        }}
      />
      <div className="text-xs text-gray-500 mt-2">
        <p>* Bold dates have available prices</p>
        <p>* Red dates indicate adjusted rates</p>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
