import ReportTabs from "@/app/dashboard/reports/_components/ReportTabs";

export const dynamic = "force-dynamic";

const ReportsPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-blue-950 font-bold text-2xl">Sales Report</h1>
            </div>
            <ReportTabs />
        </div>
    );
};

export default ReportsPage;