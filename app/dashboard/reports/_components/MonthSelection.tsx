"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {FC} from "react";

const months = [
    {id: 1, month: "january"},
    {id: 2, month: "february"},
    {id: 3, month: "march"},
    {id: 4, month: "april"},
    {id: 5, month: "may"},
    {id: 6, month: "june"},
    {id: 7, month: "july"},
    {id: 8, month: "august"},
    {id: 9, month: "september"},
    {id: 10, month: "october"},
    {id: 11, month: "november"},
    {id: 12, month: "december"},
];

const MonthSelection: FC = () => {
    const date = new Date();
    const thisMonth = date.getMonth();

    const handleSelectMonth = (selectedMonth: string) => {
        console.log(selectedMonth);
    }

    return (
        <Select onValueChange={handleSelectMonth}>
            <SelectTrigger className="w-52">
                <SelectValue placeholder={months[thisMonth].month} className="text-blue-950 capitalize" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="text-blue-950">Month</SelectLabel>
                    {months.map(month => (
                        <SelectItem
                            key={month.id}
                            value={month.month}
                            className="text-blue-950 capitalize"
                        >
                            {month.month}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default MonthSelection;