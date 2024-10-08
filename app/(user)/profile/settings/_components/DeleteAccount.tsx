"use client";
import React from "react";
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
import { TiUserDeleteOutline } from "react-icons/ti";
import { useDeleteAccount } from "@/hooks/auth/useDeleteAccount";
import LoadingButton from "@/components/LoadingButton";

const DeleteAccount: React.FC = () => {
  const { isOpen, setIsOpen, handleDeleteAccount, isLoading, error } =
    useDeleteAccount();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="bg-appcancel text-white hover:text-appcancel"
        >
          <TiUserDeleteOutline className="mr-2" size={20} />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action is <span className="font-semibold">permanent</span>. It
            will delete your account, remove all data from our servers and block
            your email from re-registering for 48 hours.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isLoading ? (
            <LoadingButton title="Deleting account..." />
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Yes, delete my account
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccount;
