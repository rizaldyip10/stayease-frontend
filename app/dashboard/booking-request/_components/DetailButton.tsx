import {Button} from "@/components/ui/button";
import {FC} from "react";
import {useRouter} from "next/navigation";

interface DetailButtonProps {
    bookingId: string;
}

const DetailButton: FC<DetailButtonProps> = ({ bookingId }) => {
    const router = useRouter();
    return (
        <Button
            variant="ghost"
            className="text-sm text-blue-950 p-2 w-full"
            onClick={() => router.push(`/dashboard/booking-request/${bookingId}`)}
        >
            See detail
        </Button>
    );
};

export default DetailButton;