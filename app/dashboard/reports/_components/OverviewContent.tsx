import SalesSummary from "@/app/dashboard/reports/_components/overview-content/SalesSummary";
import OverviewCard from "@/app/dashboard/reports/_components/overview-content/OverviewCard";
import SalesCard from "@/app/dashboard/reports/_components/overview-content/SalesCard";

const OverviewContent = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <SalesSummary />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <OverviewCard />
                <SalesCard />
            </div>
        </div>
    );
};

export default OverviewContent;