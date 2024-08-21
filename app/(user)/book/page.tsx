import BookingForm from "@/app/(user)/book/_components/BookingForm";

const BookingPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="font-bold text-blue-950 text-2xl">Your Accommodation Booking</h1>
            <div className="w-full grid grid-cols-2 gap-7">
                <div className="w-full bg-red-200">
                    <BookingForm />
                </div>
                <div className="w-full bg-blue-200">
                    Booking detail
                </div>
            </div>
        </div>
    );
};

export default BookingPage;