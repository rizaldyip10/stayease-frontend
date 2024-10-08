import { AvailablePropertyType } from "@/constants/Property";
import { useCallback, useState } from "react";
import { useCurrentLocation } from "@/hooks/utils/map/useCurrentLocation";
import { useInitMap } from "@/hooks/utils/map/useInitMap";
import { useMarker } from "@/hooks/utils/map/useMarker";
import { useSearchBox } from "@/hooks/utils/map/useSearchBox";
import { usePropertyMarkers } from "@/hooks/utils/map/usePropertyMarkers";
import { useMapEvents } from "@/hooks/utils/map/useMapEvents";
import { Wrapper } from "@googlemaps/react-wrapper";

interface MapCenter {
  lat: number;
  lng: number;
}

interface MapConfig {
  initialCenter: MapCenter;
  onLocationChange: (lat: number, lng: number) => void;
  isEditable: boolean;
  viewOnly: boolean;
  properties?: AvailablePropertyType[];
  mapStyles?: google.maps.MapTypeStyle[];
  onBoundsChanged?: () => void;
  onZoomChanged?: () => void;
  onDragEnd?: () => void;
}

export const useGoogleMaps = ({
  initialCenter,
  onLocationChange,
  isEditable,
  viewOnly,
  properties,
  mapStyles,
  onBoundsChanged,
  onZoomChanged,
  onDragEnd,
}: MapConfig) => {
  const [mapCenter, setMapCenter] = useState<MapCenter>(initialCenter);

  const handleLocationChange = useCallback(
    (newLocation: MapCenter) => {
      setMapCenter(newLocation);
      onLocationChange(newLocation.lat, newLocation.lng);
    },
    [onLocationChange, setMapCenter, mapCenter],
  );

  // call the current location
  const { getCurrentLocation } = useCurrentLocation({
    onLocationChange: handleLocationChange,
    isEditable,
    viewOnly,
  });

  // call init map
  const { mapRef, initMap, apiKey } = useInitMap({
    initialCenter: mapCenter,
    isEditable,
    viewOnly,
    mapStyles,
  });

  // call the marker
  const { markerRef, initMarker, updateMarkerAndMap } = useMarker({
    mapRef,
    initialCenter: mapCenter,
    isEditable,
    viewOnly,
    onLocationChange: handleLocationChange,
  });

  // call the search box
  const { initSearchBox } = useSearchBox({
    mapRef,
    onLocationChange: handleLocationChange,
  });

  // for property markers
  const { propertyMarkersRef } = usePropertyMarkers({
    mapRef,
    properties: properties ? properties : [],
  });

  // map events
  useMapEvents({
    mapRef,
    onBoundsChanged,
    onZoomChanged,
    onDragEnd,
  });

  // get location link
  const getLocationLink = useCallback((lat: number, lng: number) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }, []);

  const libraries: ("places" | "marker")[] = ["places", "marker"];

  return {
    Wrapper,
    apiKey,
    libraries,
    mapCenter,
    handleLocationChange,
    updateMarkerAndMap,
    getLocationLink,
    isEditable,
    viewOnly,
    initMap,
    initMarker,
    initSearchBox,
    getCurrentLocation,
    mapRef,
    markerRef,
    propertyMarkersRef,
  };
};
