import MonthSelection from "@/app/dashboard/reports/_components/MonthSelection";
import PropertySelect from "@/app/dashboard/reports/_components/PropertySelect";

const PropertiesSalesFilter = () => {
    return (
        <div className="w-full flex justify-end">
            <div className="w-max flex gap-x-3 items-center">
                <MonthSelection />
                <PropertySelect />
            </div>
        </div>
    );
};

export default PropertiesSalesFilter;