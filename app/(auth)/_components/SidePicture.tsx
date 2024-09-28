import React from "react";
import Image from "next/image";

interface PictureProps {
  className?: string;
  alt: string;
  src: string;
}

const SidePicture: React.FC<PictureProps> = ({ className, alt, src }) => {
  return (
    <div
      className={`h-full flex-1 flex flex-col items-center justify-center ${className}`}
    >
      <Image
        className="flex-1 relative max-h-screen overflow-hidden object-center py-5"
        alt={alt}
        src={src}
        width={680}
        height={800}
      />
    </div>
  );
};

export default SidePicture;
