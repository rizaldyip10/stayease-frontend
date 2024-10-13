"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {useMonthlySales} from "@/hooks/reports/useOverviewReports";
import {currencyFormatter} from "@/utils/CurrencyFormatter";

export function Chart() {
    const {
        monthlySales,
        monthlySalesIsLoading,
        monthlySalesError
    } = useMonthlySales();

    if (monthlySalesIsLoading || !monthlySales) return <>Loading...</>
    if (monthlySalesError) return <>Something went wrong</>
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlySales}>
                <XAxis
                    dataKey="month"
                    stroke="#172554"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#172554"
                    fontSize={8}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => currencyFormatter(value)}
                />
                <Bar
                    dataKey="totalAmount"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}