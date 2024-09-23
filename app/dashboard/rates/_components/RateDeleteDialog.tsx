"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { FC } from "react";
import propertyService from "@/services/propertyService";
import { useAlert } from "@/context/AlertContext";
import { usePeakSeasonRate } from "@/hooks/usePeakSeasonRate";

interface DeleteDialogProps {
  rateId: number;
  onConfirm?: () => void;
  title?: string;
  description?: string;
}

const RateDeleteDialog: FC<DeleteDialogProps> = ({
  rateId,
  onConfirm,
  title = "Delete Rate Setting",
  description = "Are you sure you want to delete this rate setting?",
}) => {
  const { showAlert } = useAlert();
  const { deleteRate } = usePeakSeasonRate();
  const handleDelete = async () => {
    try {
      await deleteRate(rateId);
    } catch (error) {
      console.log(error);
      showAlert("error", "Failed to delete rate setting");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-10 h-10 p-0">
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="link">Cancel</Button>
          </DialogClose>
          <Button className="bg-blue-950" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RateDeleteDialog;
