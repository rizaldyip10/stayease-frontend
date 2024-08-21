import React from "react";

interface PictureProps {
  alt: string;
  src: string;
}

const SidePicture: React.FC<PictureProps> = ({ alt, src }) => {
  return (
    <div className="max-h-screen flex-1 flex flex-col items-center justify-center">
      <img
        className="flex-1 relative min-w-full overflow-hidden max-h-screen object-center py-5"
        alt={alt}
        src={src}
      />
    </div>
  );
};

export default SidePicture;
