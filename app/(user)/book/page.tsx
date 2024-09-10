import BookingForm from "@/app/(user)/book/_components/BookingForm";
import BookingSummary from "@/app/(user)/book/_components/BookingSummary";
import Loading from "@/app/(user)/book/_components/Loading";
import {Suspense} from "react";

const BookingPage = () => {
    return (
        <div className="w-full flex flex-col gap-5">
            <Suspense fallback={<Loading />}>
                <h1 className="font-bold text-blue-950 text-2xl">Confirm and Pay</h1>
                <div className="w-full flex flex-col lg:flex-row gap-7">
                    <div className="w-full">
                        <BookingForm />
                    </div>
                    <div className="w-full">
                        <BookingSummary />
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default BookingPage;