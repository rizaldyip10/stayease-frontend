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
  const propertyMarkersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>(
    [],
  );

  useEffect(() => {
    if (!mapRef.current || !properties) return;

    // Clear existing markers
    propertyMarkersRef.current.forEach((marker) => {
      marker.map = null;
    });
    propertyMarkersRef.current = [];

    // Create new markers
    properties.forEach((property) => {
      const iconElement = document.createElement("img");
      iconElement.src = property.imageUrl;
      iconElement.alt = property.propertyName;
      iconElement.style.width = "32px";
      iconElement.style.height = "32px";

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: property.latitude, lng: property.longitude },
        map: mapRef.current,
        title: property.propertyName,
        content: iconElement,
      });
      propertyMarkersRef.current.push(marker);

      const infoWindow = new google.maps.InfoWindow({
        content: generateInfoWindowContent(property),
        pixelOffset: new google.maps.Size(0, -30),
      });

      addMarkerListeners(
        mapRef,
        marker,
        infoWindow,
        property.propertyId.toString(),
      );
    });
  }, [mapRef, properties]);

  return { propertyMarkersRef };
};

const generateInfoWindowContent = (property: AvailablePropertyType) =>
  `
    <div style="
      font-family: Arial, sans-serif;
      width: 150px;
      padding: 10px;
      background-color: #fff;
    ">
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <img src="${property.imageUrl}" alt="${property.propertyName}" style="
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
          margin-right: 10px;
        " />
        <div>
          <h3 style="
            margin: 0 0 4px 0;
            font-size: 14px;
            font-weight: 600;
            color: #333;
          ">${property.propertyName}</h3>
          <p style="
            margin: 0;
            font-size: 13px;
            color: #0066cc;
            font-weight: 500;
          ">${currencyFormatter(property.lowestAdjustedPrice)}</p>
        </div>
      </div>
      <a href="/properties/${property.propertyId}" target="_blank" style="
        display: block;
        text-decoration: none;
        /*background-color: #0066cc;*/
        color: darkblue;
        /*padding: 6px 0;*/
        border-radius: 4px;
        text-align: center;
        font-size: 13px;
        font-weight: 500;
      ">View Details</a>
    </div>
  `;

const addMarkerListeners = (
  mapRef: React.MutableRefObject<google.maps.Map | null>,
  marker: google.maps.marker.AdvancedMarkerElement,
  infoWindow: google.maps.InfoWindow,
  propertyId: string,
) => {
  let isInfoWindowClicked = false;

  marker.addListener("click", () => {
    isInfoWindowClicked = !isInfoWindowClicked;
    if (isInfoWindowClicked) {
      infoWindow.open(mapRef.current, marker);
    } else {
      infoWindow.close();
    }
  });

  marker.addListener("closeclick", () => {
    isInfoWindowClicked = false;
  });

  marker.addListener("dblclick", () => {
    window.open(`/properties/${propertyId}`, "_blank");
  });

  marker.addListener("mouseover", () => {
    if (!isInfoWindowClicked) {
      infoWindow.open(mapRef.current, marker);
    }
  });

  marker.addListener("mouseout", () => {
    if (!isInfoWindowClicked && infoWindow.get("map")) {
      infoWindow.close();
    }
  });
};
