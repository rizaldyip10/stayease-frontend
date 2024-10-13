"use client";

import RevenueCard from "@/app/dashboard/reports/_components/overview-content/RevenueCard";
import PaidCompleteTrxCard from "@/app/dashboard/reports/_components/overview-content/PaidCompleteTrxCard";
import UsersCard from "@/app/dashboard/reports/_components/overview-content/UsersCard";
import PropertiesCard from "@/app/dashboard/reports/_components/overview-content/PropertiesCard";
import {useOverviewSummary} from "@/hooks/reports/useOverviewReports";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const SalesSummary = () => {
    const {summary,
        summaryIsLoading,
        summaryError
    } = useOverviewSummary();

    if (summaryIsLoading || !summary) return <>Loading...</>
    if (summaryError) return <>Something went wrong</>
    return (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RevenueCard revenueDiff={summary.revenueDiff} />
            <PaidCompleteTrxCard trxDiff={summary.trxDiff} />
            <UsersCard usersDiff={summary.usersDiff} />
            <PropertiesCard totalProperties={summary.totalProperties} />
        </div>
    );
};

export default SalesSummary;