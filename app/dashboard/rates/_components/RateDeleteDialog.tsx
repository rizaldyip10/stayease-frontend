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
import { useAutoRateSetting } from "@/hooks/rates/useAutoRateSetting";

interface DeleteDialogProps {
  propertyId?: number;
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
  propertyId,
  rateId,
  onConfirm,
  title = "Delete Rate Setting",
  description = "Are you sure you want to delete this rate setting?",
  trigger,
  isOpen,
  onClose,
  onOpenChange,
}) => {
  const { deleteRate } = usePeakSeasonRate();
  const { deactivateAutoRateSetting } = useAutoRateSetting(propertyId ?? 0);
  const [open, setOpen] = useState(isOpen);

  const handleDelete = async () => {
    try {
      if (rateId) {
        await deleteRate(rateId);
      } else if (propertyId) {
        await deactivateAutoRateSetting();
      }
      setOpen(false);
      if (onConfirm) {
        onConfirm();
      }
    } catch (error) {
      console.error(
        "Error deleting rate or deactivating auto rate setting:",
        error,
      );
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
      <DialogContent aria-describedby="Delete Dialog">
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
