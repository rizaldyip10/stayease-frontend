"use client";

import RoomsCard from "@/app/dashboard/reports/_components/properties-content/RoomsCard";
import {usePopularRooms} from "@/hooks/reports/usePropertiesReport";

const PopularRoomsList = () => {
    const {
        popularRooms,
        popularRoomsIsLoading,
        popularRoomsError
    } = usePopularRooms();

    if (popularRoomsIsLoading || !popularRooms) return <>Loading...</>
    if (popularRoomsError) return <>Something went wrong</>

    return (
        <div className="space-y-8">
            {
                popularRooms.map((room, i) => (
                    <RoomsCard rooms={room} key={i} />
                ))
            }
        </div>
    );
};

export default PopularRoomsList;