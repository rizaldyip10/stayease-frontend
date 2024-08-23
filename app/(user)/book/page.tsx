import BookingForm from "@/app/(user)/book/_components/BookingForm";
import BookingSummary from "@/app/(user)/book/_components/BookingSummary";

const BookingPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="font-bold text-blue-950 text-2xl">Confirm and Pay</h1>
            <div className="w-full flex flex-col lg:flex-row gap-7">
                <div className="w-full">
                    <BookingForm />
                </div>
                <div className="w-full">
                    <BookingSummary />
                </div>
            </div>
        </div>
    );
};

export default BookingPage;