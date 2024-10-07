import DailySalesCard from "@/app/dashboard/reports/_components/properties-content/DailySalesCard";
import PopularRoomsCard from "@/app/dashboard/reports/_components/properties-content/PopularRoomsCard";
import PropertiesSalesFilter from "@/app/dashboard/reports/_components/properties-content/PropertiesSalesFilter";
import RevenueTaxSection from "@/app/dashboard/reports/_components/properties-content/RevenueTaxSection";

const PropertiesContent = () => {
    return (
        <div className="w-full grid grid-cols-1 gap-y-2">
            <PropertiesSalesFilter />
            <RevenueTaxSection />
            <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <DailySalesCard />
                <PopularRoomsCard />
            </div>
        </div>
    );
};

export default PropertiesContent;