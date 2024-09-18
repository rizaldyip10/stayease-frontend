"use client";

import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {FC} from "react";
import {currencyFormatter} from "@/utils/CurrencyFormatter";
import Image from "next/image";

interface PaymentProofDialogProps {
  paymentProof: string;
  totalAmount: number;
};

const PaymentProofDialog: FC<PaymentProofDialogProps> = ({ paymentProof, totalAmount }) => {
    return (
        <Dialog>
            <DialogTrigger className="text-sm text-blue-950 p-2">
                View payment proof
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Payment Proof</DialogTitle>
                <DialogDescription className={"hidden"}></DialogDescription>
                <h1>Total Price: {currencyFormatter(totalAmount)}</h1>
                <p>Payment Method: ATM Transfer</p>
                <div className="w-full flex justify-center">
                    <Image src={paymentProof} alt={"payment proof image"} width={200} height={200} className="w-64" />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentProofDialog;