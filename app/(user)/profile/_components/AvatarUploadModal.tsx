import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { profile, uploadAvatar, removeAvatar } = useProfile();
  const { data: session } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    session?.user?.avatarUrl,
  );
  const [isUploading, setIsUploading] = useState(false);

  const resetState = () => {
    setSelectedFile(null);
    setPreviewUrl(session?.user?.avatarUrl);
  };

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(undefined);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await uploadAvatar(selectedFile);
      onClose();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setIsUploading(true);
    try {
      await removeAvatar();
      setPreviewUrl(undefined);
      onClose();
    } catch (error) {
      console.error("Error removing avatar:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Avatar</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="w-32 h-32 relative rounded-full overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage
                src={previewUrl || profile?.avatarUrl || ""}
                alt="avatar"
              />
              <AvatarFallback className="text-4xl">
                {" "}
                {profile?.firstName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <ImageDropZone onFileChange={handleFileChange} />
          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
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
