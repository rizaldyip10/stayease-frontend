import React from "react";

interface PictureProps {
  alt: string;
  src: string;
}

const SidePicture: React.FC<PictureProps> = ({ alt, src }) => {
  return (
    <div className="self-stretch max-h-screen flex-1 flex flex-col items-center justify-center p-5">
      <img
        className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-screen object-center"
        alt={alt}
        src={src}
      />
    </div>
  );
};

export default SidePicture;
