"use client"

import * as React from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ClockIcon } from "lucide-react"
import { useField } from "formik"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimePickerProps {
    name: string;
    label: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ name, label }) => {
    const [field, meta, helpers] = useField(name);

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const handleTimeChange = async (type: 'hour' | 'minute', value: string) => {
        const currentTime = field.value ? new Date(field.value) : new Date();
        if (type === 'hour') {
            currentTime.setHours(parseInt(value));
        } else {
            currentTime.setMinutes(parseInt(value));
        }
        await helpers.setValue(currentTime);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                    )}
                >
                    <ClockIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(new Date(field.value), "HH:mm") : <span>{label}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div className="flex p-2">
                    <Select onValueChange={(value) => handleTimeChange('hour', value)}>
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                            {hours.map((hour) => (
                                <SelectItem key={hour} value={hour}>
                                    {hour}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <span className="mx-2 text-2xl">:</span>
                    <Select onValueChange={(value) => handleTimeChange('minute', value)}>
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                            {minutes.map((minute) => (
                                <SelectItem key={minute} value={minute}>
                                    {minute}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default TimePicker