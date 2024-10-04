"use client";

import {useRecentTrx} from "@/hooks/reports/useOverviewReports";
import UserSalesCard from "@/app/dashboard/reports/_components/overview-content/UserSalesCard";

export function RecentSales() {
    const {
        recentTrx,
        recentTrxIsLoading,
        recentTrxError
    } = useRecentTrx();

    if (recentTrxIsLoading || !recentTrx) return <>Loading...</>
    if (recentTrxError) return <>Something went wrong</>

    console.log(recentTrx);
    return (
        <div className="space-y-8">
            {
                recentTrx.map((trx, i) => (
                    <UserSalesCard key={i} trx={trx} />
                ))
            }
        </div>
    )
}