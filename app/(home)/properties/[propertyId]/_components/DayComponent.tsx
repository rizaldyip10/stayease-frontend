import React from "react";
import {
  isSameDay,
  isAfter,
  isBefore,
  addDays,
  format,
  isSameMonth,
  startOfDay,
} from "date-fns";

interface DayComponentProps {
  date: Date;
  currentMonth: Date;
  data: any[];
  isCheckOut: boolean;
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

// Format the price for display
const formatPrice = (price: number) => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M`;
  }
  return `${Math.round(price / 1000)}`;
};

// Helper function to determine the base class name
const getBaseClassName = (
  isCurrentMonth: boolean,
  isPastDate: boolean,
  isBeforeCheckIn: boolean,
  dayData: any,
) => {
  let className =
    "w-[35px] h-full flex flex-col items-center justify-center border-b border-r border-gray-200";
  if (!isCurrentMonth || isPastDate || isBeforeCheckIn) {
    return className + " text-gray-300";
  }
  if (dayData) {
    className += " font-bold";
    className += dayData.hasAdjustment ? " text-red-500" : " text-primary";
  }
  return className;
};

// Helper function to determine classNames for selection
const getSelectionClassName = (
  isSelected: boolean,
  isInRange: boolean,
  isLastInRange: boolean,
) => {
  let className = "";
  if (isSelected) className += " bg-primary text-primary-foreground";
  if (isInRange) className += " bg-primary/50 text-primary-foreground";
  if (isLastInRange) className += " bg-blue-950 text-primary-foreground";
  return className;
};

const DayComponent: React.FC<DayComponentProps> = ({
  date,
  currentMonth,
  data,
  isCheckOut,
  checkInDate,
  checkOutDate,
  onSelect,
  ...props
}) => {
  const dateString = format(date, "yyyy-MM-dd");
  const dayData = data?.find((a: any) => a.date === dateString);
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isPastDate = isBefore(date, startOfDay(new Date()));
  const isBeforeCheckIn =
    isCheckOut && checkInDate && isBefore(date, checkInDate) ? true : false;

  // Determine if the date is selected or in range
  const isSelected = checkInDate && isSameDay(date, checkInDate) ? true : false;
  const isInRange =
    checkInDate &&
    checkOutDate &&
    isAfter(date, checkInDate) &&
    isBefore(date, addDays(checkOutDate, -1))
      ? true
      : false;
  const isLastInRange =
    checkOutDate && isSameDay(date, checkOutDate) ? true : false;
  const allSelected = isSelected || isInRange || isLastInRange;

  // Apply styles
  const baseClassName = getBaseClassName(
    isCurrentMonth,
    isPastDate,
    isBeforeCheckIn,
    dayData,
  );
  const selectionClassName = getSelectionClassName(
    isSelected,
    isInRange,
    isLastInRange,
  );
  const className = `${baseClassName} ${selectionClassName}`;

  // Determine if the price should be shown
  const showPrice =
    dayData &&
    isCurrentMonth &&
    !isPastDate &&
    !isBeforeCheckIn &&
    (checkOutDate ? allSelected : true);

  return (
    <div
      className={className}
      {...props}
      aria-disabled={isPastDate || isBeforeCheckIn}
      onClick={(e) => {
        e.stopPropagation();
        if (!isPastDate && !isBeforeCheckIn) {
          onSelect(date);
        }
      }}
    >
      <div>{format(date, "d")}</div>
      {showPrice && (
        <div className="text-xs">{formatPrice(dayData.lowestPrice)}</div>
      )}
    </div>
  );
};

export default DayComponent;
