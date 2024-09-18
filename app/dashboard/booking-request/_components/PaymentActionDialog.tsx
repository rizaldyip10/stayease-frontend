import React, {FC, useEffect, useState} from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {transactionService} from "@/services/transactionService";
import {getAccessToken, setAccessToken} from "@/utils/axiosInterceptor";

interface PaymentActionDialogProps {
    bookingId: string;
    isApproval: boolean;
}

const PaymentActionDialog: FC<PaymentActionDialogProps> = ({ bookingId, isApproval }) => {
    const handleAction = async () => {
        try {
            if (isApproval) {
                await transactionService.tenantApproveTrx(bookingId);
            } else {
                await transactionService.tenantRejectTrx(bookingId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setAccessToken(getAccessToken());
    }, []);

    return (
        <Dialog>
            <DialogTrigger className={`text-sm ${isApproval ? 'text-green-800' : 'text-red-800'} p-2`}>
                {isApproval ? 'Approve payment' : 'Reject payment'}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>{isApproval ? 'Approve Payment' : 'Reject Payment'}</DialogTitle>
                <DialogDescription className="">
                    Are you sure you want to {isApproval ? 'approve' : 'reject'} this payment?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="bg-blue-950 text-white" onClick={handleAction}>
                            Confirm
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="link" className="text-blue-950">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentActionDialog;