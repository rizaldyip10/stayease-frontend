"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useField } from "formik";
import Image from "next/image";

interface ImageUploadProps {
  name: string;
  onImageUpload: (file: File) => Promise<string>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ name, onImageUpload }) => {
  const [field, , helpers] = useField(name);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > 1024 * 1024) {
          alert("File size must be less than 1MB");
          return;
        }
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
          alert("Only jpg, jpeg, png, and gif files are allowed");
          return;
        }
        try {
          const result = await onImageUpload(file);
          helpers.setValue(result);
        } catch (error) {
          console.error("Failed to upload image:", error);
          alert("Failed to upload image");
        }
      }
    },
    [helpers, onImageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    maxSize: 1024 * 1024,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-4 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag and drop an image here, or click to select an image</p>
      )}
      {field.value && (
        <div className="mt-2 relative w-full h-40">
          <Image
            src={field.value}
            alt="Preview"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
