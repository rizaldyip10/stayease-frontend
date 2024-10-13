"use client";

import * as React from "react";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";

interface DatePickerProps {
    name: string;
    label: string;
    value?: string | null | undefined;
    isEditing?: boolean;
    onChange: (value: Partial<any>) => void;
    className?: string;
}

const DatePicker: FC<DatePickerProps> = ({ name, label, value, className, isEditing, onChange }) => {
    const handleSelect = (date: Date | undefined) => {
        if (date) {
            onChange({ [name]: format(date, 'yyyy-MM-dd') });
        } else {
            onChange({ [name]: null })
        }
    };

    const displayValue = value
        ? format(parse(value, 'yyyy-MM-dd', new Date()), "PPP")
        : label;

    return (
        <Popover>
            <PopoverTrigger asChild disabled={!isEditing}>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !value && "text-muted-foreground", className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {displayValue}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined}
                    onSelect={handleSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default DatePicker;