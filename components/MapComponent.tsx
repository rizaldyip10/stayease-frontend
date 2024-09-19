import React from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapRender } from "./MapRender";
import { useGoogleMaps } from "@/hooks/utils/useGoogleMaps";

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  onLocationChange: (lat: number, lng: number) => void;
  isEditable?: boolean;
  viewOnly?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  initialCenter,
  onLocationChange,
  isEditable = true,
  viewOnly = false,
}) => {
  const {
    Wrapper,
    apiKey,
    libraries,
    mapCenter,
    handleLocationChange,
    getLocationLink,
    isEditable: isEditableMap,
    viewOnly: isViewOnly,
    initSearchBox,
  } = useGoogleMaps({
    initialCenter,
    onLocationChange,
    isEditable,
    viewOnly,
  });

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <div>Loading...</div>;
      case Status.FAILURE:
        return <div>Error loading Google Maps</div>;
      case Status.SUCCESS:
        return (
          <MapRender
            center={mapCenter}
            onLocationChange={handleLocationChange}
            isEditable={isEditableMap}
            viewOnly={isViewOnly}
            getLocationLink={getLocationLink}
            initSearchBox={initSearchBox}
          />
        );
    }
  };

  return <Wrapper apiKey={apiKey} libraries={libraries} render={render} />;
};

export default MapComponent;
