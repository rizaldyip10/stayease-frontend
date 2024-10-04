import DailySalesCard from "@/app/dashboard/reports/_components/properties-content/DailySalesCard";
import PopularRoomsCard from "@/app/dashboard/reports/_components/properties-content/PopularRoomsCard";

const PropertiesContent = () => {
    return (
        <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <DailySalesCard />
            <PopularRoomsCard />
        </div>
    );
};

export default PropertiesContent;