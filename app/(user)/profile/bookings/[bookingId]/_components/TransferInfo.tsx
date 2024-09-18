import {PaymentType} from "@/constants/Payment";
import {FC} from "react";
import UploadProofDialog from "@/components/UploadProofDialog";

interface ManualTransferInfoProps {
    payment: PaymentType;
    bookingId: string;
}

const TransferInfo: FC<ManualTransferInfoProps> = ({ payment, bookingId }) => {
    let paymentMethodName;
    if (payment?.paymentMethod === "manual_transfer") {
        paymentMethodName = "ATM/Manual Transfer";
    } else {
        paymentMethodName = "Bank VA";
    }
    if (payment?.paymentStatus === "pending" && payment?.paymentMethod === "manual_transfer") {
        return (
            <div className="w-full flex flex-col gap-2 text-blue-950">
                <p>Payment Type: ATM/Manual Transfer</p>
                <p>Status: Waiting for Payment</p>
                <div className="flex items-center gap-2 text-blue-950">
                    <p>Please complete the payment by uploading your payment proof before</p>
                    <p className="text-red-800 font-semibold">15:30</p>
                </div>
                <div className="w-full flex flex-col gap-1 text-blue-950 text-sm">
                    <p>Bank: BCA</p>
                    <p>Account Number: 7387582758247</p>
                    <p>Account holder&apos;s name: Stay Ease Property Rental</p>
                </div>
                <UploadProofDialog bookingId={bookingId}/>
            </div>
        )
    }
    if (payment?.paymentStatus === "pending" && payment?.paymentMethod === "bank_transfer") {
        return (
            <div className="w-full flex flex-col gap-2 text-blue-950">
                <p>Payment Type: Bank Virtual Account</p>
                <p>Status: Waiting for Payment</p>
                <div className="flex items-center gap-2 text-blue-950">
                    <p>Please complete the payment by uploading your payment proof before</p>
                    <p className="text-red-800 font-semibold">15:30</p>
                </div>
                <div className="w-full flex flex-col gap-1 text-blue-950 text-sm">
                    <p>Virtual Account Number: {payment?.bankVa}</p>
                </div>
                <UploadProofDialog bookingId={bookingId}/>
            </div>
        )
    }
    return (
        <div className="w-full flex flex-col gap-2 text-blue-950">
            <p>Payment Type: {paymentMethodName}</p>
            <p className="capitalize">Status: {payment?.paymentStatus}</p>
        </div>
    );
};

export default TransferInfo;