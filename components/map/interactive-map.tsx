"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Location {
  id: string;
  name: string;
  country: string;
  position: LatLngExpression;
  description: string;
  category: "attraction" | "restaurant" | "hotel" | "activity";
  image?: string;
  rating?: number;
  reviews?: number;
}

interface InteractiveMapProps {
  locations: Location[];
  center?: LatLngExpression;
  zoom?: number;
  onLocationClick?: (location: Location) => void;
}

function MapController({ center }: { center: LatLngExpression }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  
  return null;
}

export function InteractiveMap({
  locations,
  center = [41.9028, 12.4964], // Default to Rome, Italy
  zoom = 6,
  onLocationClick,
}: InteractiveMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={center} />
      
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={location.position}
          eventHandlers={{
            click: () => onLocationClick?.(location),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              {location.image && (
                <img
                  src={location.image}
                  alt={location.name}
                  className="mb-2 h-32 w-full rounded object-cover"
                />
              )}
              <h3 className="font-semibold">{location.name}</h3>
              <p className="text-sm text-muted-foreground">{location.country}</p>
              {location.rating && (
                <div className="mt-1 flex items-center gap-1 text-sm">
                  <span>⭐</span>
                  <span>{location.rating.toFixed(1)}</span>
                  {location.reviews && (
                    <span className="text-muted-foreground">({location.reviews})</span>
                  )}
                </div>
              )}
              <p className="mt-2 text-sm">{location.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
