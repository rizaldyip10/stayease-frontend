"use client";

import PropertyRevenueCard from "@/app/dashboard/reports/_components/properties-content/PropertyRevenueCard";
import TaxCard from "@/app/dashboard/reports/_components/properties-content/TaxCard";
import {usePropertiesSales} from "@/hooks/reports/usePropertiesReport";
import {useReportParams} from "@/hooks/reports/useReportParams";

const RevenueTaxSection = () => {
    const {reportParams} = useReportParams();
    const {
        propertiesSales,
        propertiesSalesIsLoading,
        propertiesSalesError
    } = usePropertiesSales(reportParams);

    if (propertiesSalesIsLoading || !propertiesSales) return <>Loading...</>
    if (propertiesSalesError) return <>Something went wrong... </>

    return (
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PropertyRevenueCard revenue={propertiesSales.revenue} />
            <TaxCard tax={propertiesSales.tax} />
        </div>
    );
};

export default RevenueTaxSection;