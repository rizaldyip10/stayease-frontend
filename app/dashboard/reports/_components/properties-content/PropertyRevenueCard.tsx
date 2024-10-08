"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DollarSign} from "lucide-react";
import {FC} from "react";
import {currencyFormatter} from "@/utils/CurrencyFormatter";

interface PropertyRevenueCardProps {
    revenue: number;
}

const PropertyRevenueCard: FC<PropertyRevenueCardProps> = ({ revenue }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Property&apos;s Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground text-blue-950" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{currencyFormatter(revenue)}</div>
            </CardContent>
        </Card>
    );
};

export default PropertyRevenueCard;