import { AvailablePropertyType } from "@/constants/Property";
import { useEffect, useRef } from "react";
import { currencyFormatter } from "@/utils/CurrencyFormatter";

interface PropertyMarkersConfig {
  mapRef: React.MutableRefObject<google.maps.Map | null>;
  properties: AvailablePropertyType[];
}

export const usePropertyMarkers = ({
  mapRef,
  properties,
}: PropertyMarkersConfig) => {
  const propertyMarkersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || !properties) return;

    // Clear existing markers
    propertyMarkersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    propertyMarkersRef.current = [];

    // Create new markers
    properties.forEach((property) => {
      const marker = new google.maps.Marker({
        position: { lat: property.latitude, lng: property.longitude },
        map: mapRef.current,
        title: property.propertyName,
      });
      propertyMarkersRef.current.push(marker);

      const infoWindow = new google.maps.InfoWindow({
        content: `
        <div>
          <h3>${property.propertyName}</h3>
          <p>${currencyFormatter(property.lowestAdjustedPrice)}</p>
        </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(mapRef.current, marker);
      });
    });
  }, [mapRef, properties]);

  return { propertyMarkersRef };
};
