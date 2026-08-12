export const routePoints = [
  [12.9686, 77.5848],
  [12.9722, 77.5888],
  [12.9759, 77.5926],
  [12.9796, 77.5961],
  [12.9832, 77.6005],
  [12.9864, 77.6042],
];

export const customer = {
  id: 'CUS-0284',
  name: 'Ananya Rao',
  phone: '+91 98765 43210',
  address: '18, 4th Cross, Indiranagar, Bengaluru',
  latitude: routePoints[routePoints.length - 1][0],
  longitude: routePoints[routePoints.length - 1][1],
};

export const agent = {
  id: 'AGENT-001',
  name: 'Ravi Kumar',
  vehicle: 'KA 03 MJ 8271',
  phone: '+91 90123 45678',
};

export const booking = {
  id: 'LPG-2026-00124',
  type: '14.2 kg domestic cylinder',
  createdAt: '12 Aug 2026, 10:16 AM',
  expected: 'Today · 2:42 PM',
  address: customer.address,
};

export const demoDeliveries = [
  { id: 'LPG-2026-00124', customer: 'Ananya Rao', address: 'Indiranagar, Bengaluru', distance: '5.2 km', status: 'Out for delivery', eta: '14 min' },
  { id: 'LPG-2026-00125', customer: 'Meera Shah', address: 'Koramangala, Bengaluru', distance: '7.8 km', status: 'Assigned', eta: '28 min' },
  { id: 'LPG-2026-00126', customer: 'Vikram Singh', address: 'Domlur, Bengaluru', distance: '2.1 km', status: 'Confirmed', eta: '—' },
  { id: 'LPG-2026-00127', customer: 'Sana Iqbal', address: 'Ulsoor, Bengaluru', distance: '9.4 km', status: 'Booked', eta: '—' },
];

export const notifications = [
  { id: 1, type: 'Delivery', title: 'Delivery started', body: 'Ravi has started the journey with your LPG cylinder.', time: '2 min ago', unread: true, icon: 'truck' },
  { id: 2, type: 'Delivery', title: 'Your LPG cylinder is 2 km away', body: 'We are watching the route and will alert you when the delivery is close.', time: '8 min ago', unread: true, icon: 'route' },
  { id: 3, type: 'Verification', title: 'OTP ready for delivery', body: 'Keep your 6-digit verification code ready for the doorstep handoff.', time: '12 min ago', unread: false, icon: 'shield' },
  { id: 4, type: 'Booking', title: 'Booking confirmed', body: 'Your cylinder request LPG-2026-00124 is confirmed.', time: 'Today, 10:18 AM', unread: false, icon: 'check' },
];

export const history = [
  { id: 'LPG-2026-00124', date: '12 Aug 2026', status: 'Delivered', time: '2:42 PM', verification: 'Verified', tone: 'success' },
  { id: 'LPG-2026-00098', date: '14 Jul 2026', status: 'Delivered', time: '4:08 PM', verification: 'Verified', tone: 'success' },
  { id: 'LPG-2026-00071', date: '18 Jun 2026', status: 'Delivered', time: '11:34 AM', verification: 'Verified', tone: 'success' },
  { id: 'LPG-2026-00042', date: '26 May 2026', status: 'Delivered', time: '3:16 PM', verification: 'Verified', tone: 'success' },
];
