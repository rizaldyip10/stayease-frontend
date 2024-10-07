"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DollarSign} from "lucide-react";
import {RevenueDiffType} from "@/constants/Reports";
import {FC} from "react";
import {currencyFormatter} from "@/utils/CurrencyFormatter";

interface RevenueCardProps {
    revenueDiff: RevenueDiffType;
}

const RevenueCard: FC<RevenueCardProps> = ({ revenueDiff }) => {
    let diff;
    if (revenueDiff.revenueDiffPercent >= 0) {
        diff = `+ ${revenueDiff.revenueDiffPercent}`;
    } else {
        diff = `${revenueDiff.revenueDiffPercent}`;
    }
    return (
        <Card className="text-blue-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground text-blue-950" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{currencyFormatter(revenueDiff.revenueThisMonth)}</div>
                <p className="text-xs text-muted-foreground">
                    {diff}% from last month
                </p>
            </CardContent>
        </Card>
    )
};

export default RevenueCard;