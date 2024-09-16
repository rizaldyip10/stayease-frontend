import {FC} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {transactionService} from "@/services/transactionService";

interface CancelBookingDialogProps {
    bookingId: string;
}

const CancelBookingDialog: FC<CancelBookingDialogProps> = ({ bookingId }) => {
    const handleCancel = async () => {
        try {
            await transactionService.userCancelTrx(bookingId);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Cancel
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cancel Booking</DialogTitle>
                <DialogDescription>
                    Are you sure you want to cancel this booking?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <DialogClose asChild>
                        <Button
                            onClick={handleCancel}
                        >
                            Continue
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelBookingDialog;