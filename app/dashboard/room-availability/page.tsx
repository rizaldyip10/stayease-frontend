import AvailabilityChart from "@/app/dashboard/room-availability/_components/AvailabilityChart";

const RoomAvailabilityPage = () => {
    return (
        <div className="w-full grid grid-cols-1">
            <h1>Room Availability</h1>
            <AvailabilityChart />
        </div>
    );
};

export default RoomAvailabilityPage;