export const toRadians = (value) => (value * Math.PI) / 180;

export function distanceBetween(a, b) {
  const earthRadius = 6371;
  const latDelta = toRadians(b[0] - a[0]);
  const lngDelta = toRadians(b[1] - a[1]);
  const lat1 = toRadians(a[0]);
  const lat2 = toRadians(b[0]);
  const haversine = Math.sin(latDelta / 2) ** 2 + Math.sin(lngDelta / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return earthRadius * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

export function calculateEta(position, destination) {
  const km = distanceBetween(position, destination);
  const minutes = Math.max(1, Math.round((km / 22) * 60));
  return { distance: km, etaMinutes: minutes };
}

export function formatDistance(km) {
  return km < 1 ? String(Math.round(km * 1000)) + ' m' : String(km.toFixed(1)) + ' km';
}
