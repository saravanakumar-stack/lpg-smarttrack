import { useEffect } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocateFixed, MapPinned, Route } from 'lucide-react';

const vehicleIcon = L.divIcon({ className: 'map-icon-wrap', html: '<div class="vehicle-marker"><span class="vehicle-marker-pulse"></span><span class="vehicle-marker-body">⌁</span></div>', iconSize: [48, 48], iconAnchor: [24, 24] });
const customerIcon = L.divIcon({ className: 'map-icon-wrap', html: '<div class="customer-marker"><span></span></div>', iconSize: [40, 40], iconAnchor: [20, 38] });
const waypointIcon = L.divIcon({ className: 'map-icon-wrap', html: '<span class="route-waypoint"></span>', iconSize: [12, 12], iconAnchor: [6, 6] });

function Recenter({ position }) {
  const map = useMap();
  useEffect(() => { map.flyTo(position, map.getZoom(), { duration: 0.7 }); }, [position, map]);
  return null;
}

export default function LiveMap({ delivery, routePoints, customer, compact = false }) {
  const route = routePoints || [];
  const activeRoute = [...route.slice(0, Math.max(1, Math.ceil(delivery.progress * (route.length - 1)) + 1)), delivery.position];
  const center = route[2] || [12.9759, 77.5926];
  return <div className={'live-map ' + (compact ? 'live-map-compact' : '')}>
    <MapContainer center={center} zoom={14} scrollWheelZoom={false} zoomControl={false} className="leaflet-map">
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={route} pathOptions={{ color: '#5d0703', opacity: 0.42, weight: 11, lineCap: 'round', lineJoin: 'round' }} />
      <Polyline positions={route} pathOptions={{ color: '#f4f3e6', opacity: 0.32, weight: 5, dashArray: '8 12' }} />
      <Polyline positions={activeRoute} pathOptions={{ color: '#fc703c', opacity: 1, weight: 6, lineCap: 'round', lineJoin: 'round' }} />
      {route.slice(1, -1).map((point, index) => <Marker key={`${point[0]}-${index}`} position={point} icon={waypointIcon} />)}
      <Marker position={delivery.position} icon={vehicleIcon} />
      <Marker position={[customer.latitude, customer.longitude]} icon={customerIcon} />
      <Recenter position={delivery.position} />
    </MapContainer>
    <div className="map-signal-grid" aria-hidden="true" />
    <div className="map-overlay map-overlay-top"><span className="map-chip"><MapPinned size={14} /> Indiranagar route</span><span className="map-chip map-chip-live"><span className="status-live-dot" /> LIVE</span></div>
    <div className="map-route-label"><Route size={13} /><span><b>Signal route</b><small>6 waypoints · shared state</small></span></div>
    <button className="map-recenter" aria-label="Recenter map"><LocateFixed size={17} /></button>
    <div className="map-legend"><span><i className="legend-dot legend-orange" /> Delivery vehicle</span><span><i className="legend-dot legend-cyan" /> Your location</span><span><i className="legend-dot legend-waypoint" /> Waypoint</span></div>
  </div>;
}
