import PropertySection from "@/app/(user)/profile/bookings/[bookingId]/_components/PropertySection";
import RoomSection from "@/app/(user)/profile/bookings/[bookingId]/_components/RoomSection";
import SpecialRequestSection from "@/app/(user)/profile/bookings/[bookingId]/_components/SpecialRequestSection";
import PaymentInfo from "@/app/(user)/profile/bookings/[bookingId]/_components/PaymentInfo";

const UserBookingDetailPage = ({ params }: { params: { bookingId: string } }) => {
    return (
        <div className="w-full grid grid-cols-1 gap-y-4">
            <h1 className="text-sm text-blue-950 text-opacity-70">
                Booking ID: { params.bookingId }
            </h1>
            <PropertySection />
            <RoomSection />
            <SpecialRequestSection />
            <PaymentInfo bookingId={params.bookingId} />
        </div>
    );
};

export default UserBookingDetailPage;