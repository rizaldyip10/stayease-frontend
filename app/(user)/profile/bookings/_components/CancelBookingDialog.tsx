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
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-800"
                >
                    Cancel
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Cancel Booking</DialogTitle>
                <DialogDescription>
                    Are you sure you want to cancel this booking?
                </DialogDescription>
                <div>
                    <DialogClose asChild>
                        <Button
                            variant="link"
                            className="text-blue-950"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            onClick={handleCancel}
                            className="bg-blue-950"
                        >
                            Continue
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CancelBookingDialog;