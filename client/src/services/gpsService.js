import { routePoints } from './mockData';

export function interpolatePoint(a, b, progress) {
  return [a[0] + (b[0] - a[0]) * progress, a[1] + (b[1] - a[1]) * progress];
}

export function positionAtProgress(progress) {
  const clamped = Math.max(0, Math.min(0.9999, progress));
  const scaled = clamped * (routePoints.length - 1);
  const segment = Math.floor(scaled);
  return interpolatePoint(routePoints[segment], routePoints[segment + 1], scaled - segment);
}

export function startBrowserWatch(onPosition, onError) {
  if (!navigator.geolocation) {
    onError?.(new Error('Geolocation is unavailable in this browser.'));
    return () => {};
  }
  const id = navigator.geolocation.watchPosition(
    (position) => onPosition([position.coords.latitude, position.coords.longitude]),
    onError,
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 },
  );
  return () => navigator.geolocation.clearWatch(id);
}
