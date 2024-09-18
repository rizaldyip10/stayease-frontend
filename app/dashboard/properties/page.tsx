import React from 'react';
import PropertyDisplay from "@/app/dashboard/properties/_components/PropertyDisplay";

const PropertiesPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="text-blue-950 font-bold text-2xl">Properties</h1>
            <PropertyDisplay />
        </div>
    );
};

export default PropertiesPage;