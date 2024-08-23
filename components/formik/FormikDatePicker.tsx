"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { FC } from "react"
import { useField } from "formik"

interface DatePickerProps {
    name: string;
    label: string;
    isEditing?: boolean;
}

const FormikDatePicker: FC<DatePickerProps> = (props) => {
    const [field, meta, helpers] = useField(props);
    const { name, label, isEditing } = props;

    const handleSelect = async (date: Date | undefined) => {
        if (date) {
            await helpers.setValue(format(date, 'yyyy-MM-dd'));
        } else {
            await helpers.setValue(null);
        }
    };

    const displayValue = field.value
        ? format(parse(field.value, 'yyyy-MM-dd', new Date()), "PPP")
        : label;

    return (
        <Popover>
            <PopoverTrigger asChild disabled={!isEditing}>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {displayValue}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value ? parse(field.value, 'yyyy-MM-dd', new Date()) : undefined}
                    onSelect={handleSelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
};

export default FormikDatePicker;