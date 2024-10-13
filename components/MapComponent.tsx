import React from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { MapRender } from "./MapRender";
import { useGoogleMaps } from "@/hooks/utils/useGoogleMaps";
import { AvailablePropertyType } from "@/constants/Property";
import GlobalLoading from "@/components/GlobalLoading";
import ErrorComponent from "@/components/ErrorComponent";

interface MapComponentProps {
  initialCenter: { lat: number; lng: number };
  onLocationChange: (
    lat: number,
    lng: number,
    address?: string,
    city?: string,
    country?: string,
  ) => void;
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
    updateMarkerAndMap,
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
        return (
          <div className="flex items-center justify-center align-middle h-full">
            <GlobalLoading height={50} width={50} />
          </div>
        );
      case Status.FAILURE:
        return <ErrorComponent message="Failed to load map" />;
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
            updateMarkerAndMap={updateMarkerAndMap}
          />
        );
    }
  };

  return <Wrapper apiKey={apiKey} libraries={libraries} render={render} />;
};

export default MapComponent;
