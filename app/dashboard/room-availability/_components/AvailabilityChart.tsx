"use client";

import {useAvailabilityList} from "@/hooks/reports/useAvailabilityList";
import RoomAvailabilityScheduler from "@/app/dashboard/room-availability/_components/gantt-chart";

const AvailabilityChart = () => {
    const { availableList, isLoading, error } = useAvailabilityList();
    if (isLoading) return <>Loading...</>;

    if (error) return <>Error: {error?.message || "Something went wrong"}</>;

    if (!availableList) return <>No available list</>;

    return <RoomAvailabilityScheduler rooms={availableList} />;
};

export default AvailabilityChart;