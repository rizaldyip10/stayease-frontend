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
  onDateChange: (date: Date | undefined) => void;
  minDate?: Date;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  disabled?: boolean;
}

export function CustomDatePicker({
  title,
  date,
  onDateChange,
  minDate,
  open,
  setOpen,
  disabled,
}: CustomDatePickerProps) {
  const handleSelect = (newDate: Date | undefined) => {
    onDateChange(newDate);
    if (setOpen) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          disabled={disabled}
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
          // initialFocus
          disabled={(date) => (minDate ? date < minDate : false)}
        />
      </PopoverContent>
    </Popover>
  );
}
