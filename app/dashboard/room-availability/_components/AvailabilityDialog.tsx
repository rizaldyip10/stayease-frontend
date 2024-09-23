import React from "react";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AvailabilityForm from "@/app/dashboard/room-availability/_components/AvailabilityForm";

interface AvailabilityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomId: number, startDate: Date, endDate: Date) => void;
}

const AvailabilityDialog: React.FC<AvailabilityDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Room Availability</DialogTitle>
        </DialogHeader>
        <AvailabilityForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityDialog;
