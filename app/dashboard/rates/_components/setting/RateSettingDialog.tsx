import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RatesManagement } from "./RatesManagement";
import { RateResponseType } from "@/constants/Rates";

interface RateDialogProps {
  isEditing: boolean;
  selectedRate?: RateResponseType;
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

const RateSettingDialog: React.FC<RateDialogProps> = ({
  isEditing,
  selectedRate,
  trigger,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          {/*<DialogTitle>{isEditing ? "Edit Rate" : "Set New Rate"}</DialogTitle>*/}
        </DialogHeader>
        <RatesManagement
          isEditing={isEditing}
          selectedRate={selectedRate}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RateSettingDialog;
