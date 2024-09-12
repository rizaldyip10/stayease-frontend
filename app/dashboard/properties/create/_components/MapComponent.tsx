import React from "react";
import { useGoogleMaps } from "@/hooks/useGoogleMaps";

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  onLocationChange: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  initialCenter,
  onLocationChange,
}) => {
  const { Wrapper, apiKey, libraries, render } = useGoogleMaps(
    initialCenter,
    onLocationChange,
  );

  return <Wrapper apiKey={apiKey} libraries={libraries} render={render} />;
};

export default MapComponent;
