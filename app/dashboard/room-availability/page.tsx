import AvailabilityChart from "@/app/dashboard/room-availability/_components/AvailabilityChart";

const RoomAvailabilityPage = () => {
    return (
        <div className="w-full grid grid-cols-1 gap-y-5">
            <h1 className="text-blue-950 font-bold text-2xl">Room Availability</h1>
            <AvailabilityChart />
        </div>
    );
};

export default RoomAvailabilityPage;