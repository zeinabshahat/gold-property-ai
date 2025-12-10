import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

// Fix for default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationPickerProps {
  latitude: string;
  longitude: string;
  onLocationChange: (lat: string, lng: string) => void;
}

const LocationPicker = ({ latitude, longitude, onLocationChange }: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);

  // Default center (Cairo, Egypt)
  const defaultCenter: [number, number] = [30.0444, 31.2357];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView(defaultCenter, 12);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Handle click to set marker
    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Remove existing marker
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Add new marker
      markerRef.current = L.marker([lat, lng], { icon: defaultIcon }).addTo(map);
      setCurrentPosition({ lat, lng });
      onLocationChange(lat.toFixed(6), lng.toFixed(6));
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker when latitude/longitude props change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        if (markerRef.current) {
          markerRef.current.remove();
        }
        markerRef.current = L.marker([lat, lng], { icon: defaultIcon }).addTo(mapInstanceRef.current);
        mapInstanceRef.current.setView([lat, lng], 12);
        setCurrentPosition({ lat, lng });
      }
    }
  }, [latitude, longitude]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>Click on the map to set the property location</span>
      </div>
      
      <div 
        ref={mapRef}
        className="h-[300px] w-full rounded-lg overflow-hidden border border-border shadow-sm z-0"
      />

      {currentPosition && (
        <div className="flex gap-4 text-sm">
          <span className="text-muted-foreground">
            Lat: <span className="text-foreground font-medium">{currentPosition.lat.toFixed(6)}</span>
          </span>
          <span className="text-muted-foreground">
            Lng: <span className="text-foreground font-medium">{currentPosition.lng.toFixed(6)}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
