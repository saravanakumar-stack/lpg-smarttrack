import { ArrowUpRight, CalendarDays, Cylinder, MapPin, Package, Truck } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { Link } from 'wouter';

export default function BookingCard({ booking, delivery }) {
  return <article className="booking-card">
    <div className="booking-card-head"><div className="cylinder-illustration"><Cylinder size={34} strokeWidth={1.4} /></div><div><span className="eyebrow">Active booking</span><h3>LPG cylinder</h3><p>{booking.id}</p></div><StatusBadge tone="orange" live>Out for delivery</StatusBadge></div>
    <div className="booking-grid"><div><span className="detail-label"><CalendarDays size={14} /> Expected</span><strong>{booking.expected}</strong></div><div><span className="detail-label"><MapPin size={14} /> Delivering to</span><strong>{booking.address}</strong></div><div><span className="detail-label"><Truck size={14} /> Distance</span><strong>{delivery.distanceLabel} away</strong></div><div><span className="detail-label"><Package size={14} /> Service</span><strong>Standard refill</strong></div></div>
    <Link href="/customer/track" className="button button-primary button-wide">Track delivery <ArrowUpRight size={16} /></Link>
  </article>;
}
