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
import { FC, useState } from "react";
import { usePropertyData } from "@/hooks/properties/usePropertyData";
import LoadingButton from "@/components/LoadingButton";
import ErrorComponent from "@/components/ErrorComponent";

interface DeleteDialogProps {
  propertyId: number;
  roomId?: number;
  onConfirm?: () => void;
  title?: string;
  description?: string;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
  propertyId,
  roomId,
  onConfirm,
  title = "Delete Property",
  description = "Are you sure you want to delete?",
}) => {
  const { deleteProperty, deleteRoom, isLoading, error } =
    usePropertyData(propertyId);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (roomId) {
      await deleteRoom(roomId);
    } else {
      await deleteProperty();
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-10 h-10 p-0">
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {error ? (
          <ErrorComponent message={error} />
        ) : (
          <>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            <DialogFooter>
              {isLoading ? (
                <div className="w=1/4 flex justify-end">
                  <LoadingButton title="Processing..." />
                </div>
              ) : (
                <>
                  <DialogClose asChild>
                    <Button variant="link">Cancel</Button>
                  </DialogClose>
                  <Button className="bg-blue-950" onClick={handleDelete}>
                    Delete
                  </Button>
                </>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
