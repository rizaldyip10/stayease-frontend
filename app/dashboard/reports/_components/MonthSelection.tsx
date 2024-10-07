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
import {useReportParams} from "@/hooks/reports/useReportParams";
import {useQueryClient} from "@tanstack/react-query";

const months = [
    {id: 1, month: "January"},
    {id: 2, month: "February"},
    {id: 3, month: "March"},
    {id: 4, month: "April"},
    {id: 5, month: "May"},
    {id: 6, month: "June"},
    {id: 7, month: "July"},
    {id: 8, month: "August"},
    {id: 9, month: "September"},
    {id: 10, month: "October"},
    {id: 11, month: "November"},
    {id: 12, month: "December"},
];

const MonthSelection: FC = () => {
    const queryClient = useQueryClient();
    const {reportParams, handleParamsChange} = useReportParams();

    const date = new Date();
    const thisMonth = date.getMonth();

    const handleSelectMonth = (selectedMonth: string) => {
        handleParamsChange({month: selectedMonth});
        queryClient.invalidateQueries({queryKey: ["get-daily-sales"]});

    };

    const placeholder = reportParams.month ? reportParams.month : months[thisMonth].month;

    return (
        <Select onValueChange={handleSelectMonth}>
            <SelectTrigger className="w-52">
                <SelectValue placeholder={placeholder} className="text-blue-950 capitalize" />
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