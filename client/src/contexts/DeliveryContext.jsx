// Warm Terracotta delivery signal: one shared live stream powers tracking, toasts, unread notifications, and handoff history.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { booking, customer, notifications as seedNotifications, routePoints } from '../services/mockData';
import { calculateEta, formatDistance } from '../services/etaService';
import { positionAtProgress } from '../services/gpsService';
import { getProximityMessage } from '../services/notificationService';

const DeliveryContext = createContext(null);

function buildDelivery(progress = 0.36, running = false) {
  const position = positionAtProgress(progress);
  const metrics = calculateEta(position, [customer.latitude, customer.longitude]);
  const status = progress >= 0.96 ? 'arrived' : progress >= 0.72 ? 'near_you' : running ? 'out_for_delivery' : 'assigned';
  return { ...booking, position, progress, status, isRunning: running, etaMinutes: metrics.etaMinutes, distanceKm: metrics.distance, distanceLabel: formatDistance(metrics.distance), updatedAt: new Date(), proximityMessage: getProximityMessage(metrics.distance, status) };
}

export function DeliveryProvider({ children }) {
  const [delivery, setDelivery] = useState(() => buildDelivery());
  const [toast, setToast] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [notifications, setNotifications] = useState(() => seedNotifications.map((item) => ({ ...item })));
  const nearYouNotified = useRef(false);
  const channelRef = useRef(null);

  useEffect(() => {
    if (!('BroadcastChannel' in window)) return undefined;
    const channel = new BroadcastChannel('lpg-smarttrack-live');
    channelRef.current = channel;
    channel.onmessage = (event) => {
      const item = event.data?.item;
      if (event.data?.type !== 'notification' || !item) return;
      setNotifications((current) => [item, ...current.filter((existing) => existing.id !== item.id)].slice(0, 24));
    };
    return () => { channel.close(); channelRef.current = null; };
  }, []);

  const addNotification = useCallback((data) => {
    const item = { id: `live-${Date.now()}-${Math.random().toString(16).slice(2)}`, unread: true, time: 'Just now', ...data };
    setNotifications((current) => [item, ...current].slice(0, 24));
    channelRef.current?.postMessage({ type: 'notification', item });
  }, []);

  useEffect(() => {
    if (!delivery.isRunning) return undefined;
    const timer = window.setInterval(() => setDelivery((current) => {
      const nextProgress = Math.min(0.985, current.progress + 0.012);
      return buildDelivery(nextProgress, nextProgress < 0.96);
    }), 1400);
    return () => window.clearInterval(timer);
  }, [delivery.isRunning]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (delivery.status === 'near_you' && !nearYouNotified.current) {
      nearYouNotified.current = true;
      addNotification({ type: 'Delivery', icon: 'route', title: 'Your delivery is nearby', body: 'Ravi is less than 2 km away. Keep your phone close for the handoff OTP.' });
      setToast({ tone: 'success', title: 'Delivery nearby', body: 'A real-time route alert was added to your notification center.' });
    }
    if (delivery.status === 'assigned') nearYouNotified.current = false;
  }, [delivery.status, addNotification]);

  const actions = useMemo(() => ({
    start() {
      setDelivery((current) => buildDelivery(Math.max(current.progress, 0.36), true));
      addNotification({ type: 'Delivery', icon: 'truck', title: 'Driver is on the move', body: 'Ravi has started the route to your address.' });
      setToast({ tone: 'success', title: 'Demo GPS active', body: 'The delivery vehicle is moving along the shared route.' });
    },
    pause() {
      setDelivery((current) => buildDelivery(current.progress, false));
      setToast({ tone: 'info', title: 'Tracking paused', body: 'Resume the demo whenever you are ready.' });
    },
    reset() {
      setDelivery(buildDelivery(0.36, false));
      setFeedback(null);
      nearYouNotified.current = false;
      setNotifications(seedNotifications.map((item) => ({ ...item })));
      setToast({ tone: 'info', title: 'Demo reset', body: 'The vehicle is back at the assigned position.' });
    },
    submitFeedback(rating, note) {
      setFeedback({ rating, note: note.trim(), submittedAt: new Date() });
      addNotification({ type: 'Verification', icon: 'check', title: 'Feedback saved', body: 'Your delivery rating has been added to this verified handoff.' });
      setToast({ tone: 'success', title: 'Feedback received', body: 'Thanks for helping improve the delivery experience.' });
    },
    markArrived() {
      setDelivery((current) => ({ ...buildDelivery(0.985, false), status: 'arrived', arrivedAt: new Date() }));
      addNotification({ type: 'Delivery', icon: 'route', title: 'Driver has arrived', body: 'Your delivery partner is at the doorstep. Share the OTP to complete handoff.' });
      setToast({ tone: 'success', title: 'Agent marked arrived', body: 'The customer can now verify the handoff with OTP.' });
    },
    complete() {
      setDelivery((current) => ({ ...current, status: 'delivered', isRunning: false, completedAt: new Date(), etaMinutes: 0, distanceKm: 0, distanceLabel: '0 m', proximityMessage: 'Delivery successfully verified.' }));
      addNotification({ type: 'Verification', icon: 'shield', title: 'Delivery handoff completed', body: 'The delivery was completed and is ready for customer feedback.' });
      setToast({ tone: 'success', title: 'Delivery completed', body: 'The demo delivery is now marked as verified.' });
    },
    verify() {
      setDelivery((current) => ({ ...current, status: 'delivered', isRunning: false, completedAt: new Date(), etaMinutes: 0, distanceKm: 0, distanceLabel: '0 m', proximityMessage: 'Delivery successfully verified.' }));
      addNotification({ type: 'Verification', icon: 'shield', title: 'Delivery verified', body: 'The OTP matched and the handoff is ready for your rating.' });
      setToast({ tone: 'success', title: 'Delivery verified', body: 'The OTP matched and the handoff is complete.' });
    },
    sendPush(title, body, audience = 'All active users') {
      addNotification({ type: 'Security', icon: 'shield', title, body: `${body} · Audience: ${audience}` });
      setToast({ tone: 'success', title: 'Push broadcast sent', body: `Delivered to ${audience.toLowerCase()}.` });
    },
    markAllNotificationsRead() { setNotifications((current) => current.map((item) => ({ ...item, unread: false }))); },
    markNotificationRead(id) { setNotifications((current) => current.map((item) => item.id === id ? { ...item, unread: false } : item)); },
  }), [addNotification]);

  const unreadCount = notifications.filter((item) => item.unread).length;
  const value = useMemo(() => ({ booking, delivery, customer, routePoints, toast, feedback, notifications, unreadCount, ...actions }), [delivery, toast, feedback, notifications, unreadCount, actions]);
  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>;
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (!context) throw new Error('useDelivery must be used within DeliveryProvider');
  return context;
}
