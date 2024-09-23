import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RatesManagement } from "./RatesManagement";
import { RateResponse } from "@/services/rateService";

interface RateDialogProps {
  isEditing: boolean;
  selectedRate?: RateResponse;
  trigger: React.ReactNode;
}

const RateSettingDialog: React.FC<RateDialogProps> = ({
  isEditing,
  selectedRate,
  trigger,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Rate" : "Set New Rate"}</DialogTitle>
        </DialogHeader>
        <RatesManagement isEditing={isEditing} selectedRate={selectedRate} />
      </DialogContent>
    </Dialog>
  );
};

export default RateSettingDialog;
