import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CustomDatePickerProps {
  title: string;
  date?: Date;
  onDateChange: (date?: Date) => void;
  minDate?: Date;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CustomDatePicker({
  title,
  date,
  onDateChange,
  minDate,
  open,
  onOpenChange,
}: CustomDatePickerProps) {
  const handleSelect = (newDate: Date | undefined) => {
    onDateChange(newDate);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{title}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          disabled={(date) => (minDate ? date < minDate : false)}
        />
      </PopoverContent>
    </Popover>
  );
}
