import React from "react";
import { useProfile } from "@/context/ProfileContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageDropZone from "@/components/ImageDropZone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAvatarUpload } from "@/hooks/utils/useAvatarUpload";
import LoadingButton from "@/components/LoadingButton";

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { profile } = useProfile();
  const {
    selectedFile,
    previewUrl,
    isUploading,
    handleFileChange,
    handleUpload,
    handleRemove,
  } = useAvatarUpload(isOpen, onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Avatar</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="w-32 h-32 relative rounded-full overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage src={previewUrl} alt="avatar" />
              <AvatarFallback className="text-4xl">
                {" "}
                {profile?.firstName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <ImageDropZone onFileChange={handleFileChange} />
          <div className="flex gap-2">
            {isUploading ? (
              <LoadingButton title="Uploading.." />
            ) : (
              <Button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
              >
                Upload
              </Button>
            )}
            <Button
              onClick={handleRemove}
              disabled={isUploading}
              variant={"outline"}
            >
              Remove Avatar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarUploadModal;
