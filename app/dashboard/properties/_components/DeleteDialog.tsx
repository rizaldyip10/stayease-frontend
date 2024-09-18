"use client";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import {FC} from "react";
import propertyService from "@/services/propertyService";

interface DeleteDialogProps {
    propertyId: number;
    roomId?: number;
    isProperty: boolean;
}

const DeleteDialog: FC<DeleteDialogProps> = ({ isProperty, propertyId, roomId }) => {
    const handleDelete = async () => {
        try {
            if (isProperty) {
                await propertyService.deleteProperty(propertyId);
            } else {
                await propertyService.deleteRoom(propertyId, roomId!)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-10 h-10 p-0"
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Delete Property
                </DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="link"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className="bg-blue-950"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;