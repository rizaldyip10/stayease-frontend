"use client";
import React from "react";
import Lottie from "react-lottie";
import animationData from "@/assets/lotties/lottie-loading.json";

interface LottieLoadingProps {
  width?: number;
  height?: number;
}

const LottieLoading: React.FC<LottieLoadingProps> = ({
  width = 200,
  height = 200,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieLoading;
