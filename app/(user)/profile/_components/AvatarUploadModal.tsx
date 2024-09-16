import React from "react";
import { useProfile } from "@/hooks/useProfile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserImage } from "@/services/profileService";

interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string | undefined;
}

const AvatarUploadModal: React.FC<AvatarUploadModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(
    currentAvatar,
  );
  const [error, setError] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const { uploadAvatar, setOrRemoveAvatar } = useProfile();

  const validateFile = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    const maxSize = 1024 * 1024; // 1MB

    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type. Please upload an image file.");
      return false;
    }

    if (file.size > maxSize) {
      setError(
        "File is too large. Please upload an image file smaller than 1MB.",
      );
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
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
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const result: UserImage = await uploadAvatar(selectedFile);
      console.log("result:", result);
      if (result) {
        await setOrRemoveAvatar(result);
        onClose();
      } else {
        throw new Error("Failed to get avatar URL after upload");
      }
    } catch (error) {
      setError(
        "An error occurred while uploading the image. Please try again.",
      );
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    setIsUploading(true);
    try {
      await setOrRemoveAvatar(null);
      onClose();
    } catch (error) {
      setError("An error occurred while removing the image. Please try again.");
      console.error(error);
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
            {/*// TODO : placeholder?*/}
            <Image
              src={previewUrl || currentAvatar || ""}
              width={128}
              height={128}
              alt="Avatar preview"
            />
          </div>
          <div className="flex justify-center items-center">
            <input
              type="file"
              accept="image/jpeg, image/png, image/jpg, image/gif"
              onChange={handleFileChange}
              className="border border-gray-100 rounded-md p-1 w-4/5"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile || !!error}
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
