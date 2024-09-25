import React from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapRender } from "./MapRender";
import { useGoogleMaps } from "@/hooks/utils/useGoogleMaps";
import { AvailablePropertyType } from "@/constants/Property";

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  onLocationChange: (lat: number, lng: number) => void;
  isEditable?: boolean;
  viewOnly?: boolean;
  properties?: AvailablePropertyType[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  initialCenter,
  onLocationChange,
  isEditable = true,
  viewOnly = false,
  properties,
}) => {
  const {
    apiKey,
    libraries,
    mapCenter,
    handleLocationChange,
    getLocationLink,
    isEditable: isEditableMap,
    viewOnly: isViewOnly,
    initMap,
    initMarker,
    initSearchBox,
    getCurrentLocation,
    mapRef,
    markerRef,
    propertyMarkersRef,
  } = useGoogleMaps({
    initialCenter,
    onLocationChange,
    isEditable,
    viewOnly,
    properties,
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
            initMap={initMap}
            initMarker={initMarker}
            initSearchBox={initSearchBox}
            getCurrentLocation={getCurrentLocation}
            mapRef={mapRef}
            markerRef={markerRef}
            propertyMarkersRef={propertyMarkersRef}
          />
        );
    }
  };

  return <Wrapper apiKey={apiKey} libraries={libraries} render={render} />;
};

export default MapComponent;
