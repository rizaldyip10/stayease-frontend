import React from "react";
import LottieLoading from "./LottieLoading";

interface GlobalLoadingProps {
  fullPage?: boolean;
  width?: number;
  height?: number;
}

const GlobalLoading: React.FC<GlobalLoadingProps> = ({
  fullPage = false,
  width,
  height,
}) => {
  const containerStyle: React.CSSProperties = fullPage
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }
    : {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      };

  return (
    <div style={containerStyle}>
      <LottieLoading width={width} height={height} />
    </div>
  );
};

export default GlobalLoading;
