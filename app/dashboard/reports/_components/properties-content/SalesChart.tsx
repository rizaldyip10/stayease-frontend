"use client";

import {Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {useDailySales} from "@/hooks/reports/usePropertiesReport";
import {currencyFormatter} from "@/utils/CurrencyFormatter";

const SalesChart = () => {
    const {
        dailySales,
        dailySalesIsLoading,
        dailySalesError
    } = useDailySales();

    if (dailySalesIsLoading || !dailySales) return <>Loading...</>
    if (dailySalesError) return <>Something went wrong</>

    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={dailySales}>
                <XAxis
                    dataKey="date"
                    stroke="#172554"
                    fontSize={8}
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
                <Line
                    dataKey="totalPrice"
                    type="monotone"
                    stroke="#172554"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesChart;