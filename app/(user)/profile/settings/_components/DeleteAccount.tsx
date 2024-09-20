"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { profileService } from "@/services/profileService";
import { useAlert } from "@/context/AlertContext";

const DeleteAccount: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showAlert } = useAlert();

  const handleDeleteAccount = async () => {
    try {
      await profileService.deleteAccount();
      showAlert("success", "Account deleted successfully");
      setIsOpen(false);
    } catch (error: any) {
      showAlert("error", error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers. Any future bookings
            will be cancelled.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Yes, delete my account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccount;
