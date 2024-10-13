import {PopularRoomType} from "@/constants/Reports";
import {FC} from "react";
import Image from "next/image";

interface RoomsCardProps {
    rooms: PopularRoomType;
}

const RoomsCard: FC<RoomsCardProps> = ({ rooms }) => {
    return (
        <div className="flex items-center">
            <Image src={rooms.roomImg} alt={"room image"} height={64} width={64} className="w-16 h-16 object-cover" />
            <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{rooms.room}</p>
                <p className="text-sm text-muted-foreground">
                    {rooms.property}
                </p>
            </div>
            <div className="ml-auto font-medium">{rooms.totalBooked} times</div>
        </div>
    );
};

export default RoomsCard;