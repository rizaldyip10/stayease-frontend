"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import OverviewContent from "@/app/dashboard/reports/_components/OverviewContent";
import PropertiesContent from "@/app/dashboard/reports/_components/PropertiesContent";

const ReportTabs = () => {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid max-w-80 grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <OverviewContent />
            </TabsContent>
            <TabsContent value="properties">
                <PropertiesContent />
            </TabsContent>
        </Tabs>
    );
};

export default ReportTabs;