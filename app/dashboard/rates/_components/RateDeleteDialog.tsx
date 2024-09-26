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
import React, { FC, useEffect, useState } from "react";
import { useAlert } from "@/context/AlertContext";
import { usePeakSeasonRate } from "@/hooks/rates/usePeakSeasonRate";
import { useRoomAvailability } from "@/hooks/reports/useRoomAvailability";
import { isConfigOption } from "jackspeak";

interface DeleteDialogProps {
  rateId?: number;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}

const RateDeleteDialog: FC<DeleteDialogProps> = ({
  rateId,
  onConfirm,
  title = "Delete Rate Setting",
  description = "Are you sure you want to delete this rate setting?",
  trigger,
  isOpen,
  onClose,
  onOpenChange,
}) => {
  const { showAlert } = useAlert();
  const { deleteRate } = usePeakSeasonRate();
  const [open, setOpen] = useState(isOpen);

  const handleDelete = async () => {
    if (rateId) {
      try {
        await deleteRate(rateId);
        showAlert("success", "Rate setting deleted successfully");
        setOpen(false);
        if (onOpenChange) onOpenChange(false); // Notify parent component
      } catch (error) {
        console.log(error);
        showAlert("error", "Failed to delete rate setting");
      }
    }
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {!trigger ? (
          <Button variant="ghost" className="w-10 h-10 p-0">
            <Trash className="w-4 h-4" />
          </Button>
        ) : (
          trigger
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="link">Cancel</Button>
          </DialogClose>
          {onConfirm ? (
            <Button variant="destructive" onClick={() => onConfirm()}>
              Confirm
            </Button>
          ) : (
            <Button className="bg-blue-950" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RateDeleteDialog;
