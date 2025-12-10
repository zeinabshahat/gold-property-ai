import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";

// Fix for default marker icon
const defaultIcon = new Icon({
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

const LocationMarker = ({
  position,
  onPositionChange,
}: {
  position: LatLng | null;
  onPositionChange: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onPositionChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
};

const LocationPicker = ({ latitude, longitude, onLocationChange }: LocationPickerProps) => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const mapRef = useRef<any>(null);

  // Default center (Cairo, Egypt)
  const defaultCenter: [number, number] = [30.0444, 31.2357];

  useEffect(() => {
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setPosition(new LatLng(lat, lng));
      }
    }
  }, [latitude, longitude]);

  const handlePositionChange = (lat: number, lng: number) => {
    setPosition(new LatLng(lat, lng));
    onLocationChange(lat.toFixed(6), lng.toFixed(6));
  };

  const center: [number, number] = position
    ? [position.lat, position.lng]
    : defaultCenter;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>Click on the map to set the property location</span>
      </div>
      
      <div className="relative h-[300px] w-full rounded-lg overflow-hidden border border-border shadow-sm">
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} onPositionChange={handlePositionChange} />
        </MapContainer>
      </div>

      {position && (
        <div className="flex gap-4 text-sm">
          <span className="text-muted-foreground">
            Lat: <span className="text-foreground font-medium">{position.lat.toFixed(6)}</span>
          </span>
          <span className="text-muted-foreground">
            Lng: <span className="text-foreground font-medium">{position.lng.toFixed(6)}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
