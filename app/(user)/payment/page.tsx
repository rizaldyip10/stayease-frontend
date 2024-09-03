import PaymentInfo from "@/app/(user)/payment/_components/PaymentInfo";
import PaymentAlert from "@/app/(user)/payment/_components/PaymentAlert";

const Page = () => {
    // FETCH PAYMENT INFO FROM BACKEND
    return (
        <div className="w-full flex flex-col gap-10">
            <h1 className="text-blue-950 font-semibold text-2xl">Payment</h1>
            <PaymentAlert />
            {/* PAYMENT EXPIRY COUNTDOWN HERE */}
            <PaymentInfo />
        </div>
    );
};

export default Page;