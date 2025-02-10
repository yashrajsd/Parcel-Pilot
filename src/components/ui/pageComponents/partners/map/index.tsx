'use client'
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { REGION } from "@/constants/regionData";

const customIcon = new L.Icon({
  iconUrl: "https://img.freepik.com/free-vector/shed-concept-illustration_114360-8901.jpg?t=st=1738956507~exp=1738960107~hmac=d83a046dcf6ea042818b4cf6fbd0318e070be5e8ce4877360b3eb5ed7fe625ba&w=740",
  iconRetinaUrl: "https://img.freepik.com/free-vector/shed-concept-illustration_114360-8901.jpg?t=st=1738956507~exp=1738960107~hmac=d83a046dcf6ea042818b4cf6fbd0318e070be5e8ce4877360b3eb5ed7fe625ba&w=740",
  iconSize: [45, 45],
  iconAnchor: [17, 42],
  popupAnchor: [1, -38],
});

const ChangeView: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();

  React.useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
};

interface PartnersMapProps {
  regions?: REGION[];
  Location: [number, number];
}

const PartnersMap: React.FC<PartnersMapProps> = ({ regions = [], Location }) => {
  return (
    <div style={{ height: "500px", width: "100%" }} className="rounded-md overflow-hidden border-[1px]">
      <MapContainer center={Location} zoom={16} style={{ height: "100%", width: "100%" }} zoomControl={false}>
        <ChangeView center={Location} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {regions.map((region) => (
          <Marker
            key={region._id}
            position={[parseFloat(region.location.latitude), parseFloat(region.location.longitude)]}
            icon={customIcon}
          >
            <Popup>{region.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PartnersMap;
