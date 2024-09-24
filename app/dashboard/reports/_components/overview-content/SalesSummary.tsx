"use client";

import RevenueCard from "@/app/dashboard/reports/_components/overview-content/RevenueCard";
import PaidCompleteTrxCard from "@/app/dashboard/reports/_components/overview-content/PaidCompleteTrxCard";
import UsersCard from "@/app/dashboard/reports/_components/overview-content/UsersCard";
import PropertiesCard from "@/app/dashboard/reports/_components/overview-content/PropertiesCard";

const SalesSummary = () => {
    return (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <RevenueCard />
            <PaidCompleteTrxCard />
            <UsersCard />
            <PropertiesCard />
        </div>
    );
};

export default SalesSummary;