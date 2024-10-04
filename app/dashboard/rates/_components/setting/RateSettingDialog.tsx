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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface RateDialogProps {
  isEditing: boolean;
  selectedRate?: RateResponseType;
  trigger: React.ReactNode;
}

const RateSettingDialog: React.FC<RateDialogProps> = ({
  isEditing,
  selectedRate,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]"
        aria-describedby="rate-setting-dialog"
      >
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>
              {isEditing ? "Edit Rate" : "Set New Rate"}
            </DialogTitle>
          </VisuallyHidden>
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
