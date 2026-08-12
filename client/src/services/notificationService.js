export function getProximityMessage(distanceKm, status) {
  if (status === 'arrived') return 'Your delivery agent has arrived.';
  if (distanceKm <= 0.2) return 'Your delivery agent is almost at your location.';
  if (distanceKm <= 1) return 'Your delivery is approaching.';
  if (distanceKm <= 2) return 'Your LPG delivery is getting closer.';
  return 'Your delivery has started.';
}
