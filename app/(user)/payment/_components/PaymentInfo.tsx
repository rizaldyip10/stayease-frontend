"use client";

import Image from "next/image";
import bca from "@/assets/images/bca.png";
import bni from "@/assets/images/bni.png";
import cimb from "@/assets/images/cimb.png";
import atm from "@/assets/images/atm-logo.png";
import {usePaymentQuery} from "@/hooks/usePaymentQuery";
import {Button} from "@/components/ui/button";
import {usePaymentInfo} from "@/hooks/usePaymentInfo";
import UploadProofDialog from "@/app/(user)/payment/_components/UploadProofDialog";

const PaymentInfo = () => {
    const { bank, id } = usePaymentQuery();

    let bankImg;
    let bankName;
    switch (bank) {
        case "bca":
            bankImg = bca;
            bankName = "BCA";
            break;
        case "bni":
            bankImg = bni;
            bankName = "BNI";
            break;
        case "cimb":
            bankImg = cimb;
            bankName = "CIMB Niaga";
            break;
        default:
            bankImg = atm;
            bankName = "ATM/Manual Transfer"
            break;
    }

    const { paymentInfo } = usePaymentInfo(id!);

    return (
        <div className="w-full flex flex-col md:flex-row items-center md:items-start bg-white border border-gray-200 rounded-md p-6 gap-5 text-blue-950">
            <Image src={bankImg} alt={"bank"} height={128} width={192} className="h-32 w-48 object-contain" />
            <div className="flex flex-col gap-2 w-full">
                <h1 className="text-xs mb-2">Please do the payment within the time given. If you did not do the payment this transaction will be automatically cancelled</h1>
                {
                    !bank || bank !== "atm" ?
                        <>
                            <p className="font-medium">Bank: {bankName}</p>
                            <p className="font-medium">VA Number: {paymentInfo?.bankVa}</p>
                        </> :
                        <>
                            <h1 className="font-medium">Please transfer to bank account below</h1>
                            <p className="text-sm">Bank: BCA</p>
                            <p className="text-sm">Account number: 7387582758247</p>
                            <p className="text-sm">Account holder&apos;s name: Stay Ease Property Rental </p>
                            <div className="w-full flex md:justify-end">
                                <UploadProofDialog />
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default PaymentInfo;