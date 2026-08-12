import { ArrowRight, Bell, CalendarDays, ChevronRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Link } from 'wouter';
import BookingCard from '../../components/delivery/BookingCard';
import DeliveryTimeline from '../../components/delivery/DeliveryTimeline';
import ETACard from '../../components/delivery/ETACard';
import StatusBadge from '../../components/common/StatusBadge';
import { useDelivery } from '../../contexts/DeliveryContext';

export default function CustomerDashboard() {
  const { booking, delivery } = useDelivery();
  return <div className="dashboard-page">
    <div className="page-intro"><div><span className="section-kicker">Your delivery overview</span><h2>Your LPG delivery is <em>on the way.</em></h2><p>Track your delivery in real time and know when it will arrive.</p></div><div className="intro-date"><CalendarDays size={17} /><span>Wednesday, 12 August 2026</span></div></div>
    <div className="dashboard-grid"><div className="dashboard-main"><BookingCard booking={booking} delivery={delivery} /><div className="journey-card"><div className="card-heading"><div><span className="eyebrow">Delivery journey</span><h3>Moving toward your doorstep</h3></div><StatusBadge tone="live" live>Live</StatusBadge></div><DeliveryTimeline status={delivery.status} /><div className="journey-foot"><span><Truck size={15} /> Ravi is carrying your cylinder</span><Link href="/customer/track" className="text-link text-link-dark">View route <ArrowRight size={14} /></Link></div></div></div><aside className="dashboard-aside"><ETACard delivery={delivery} /><div className="side-card spotlight-card"><span className="spotlight-icon"><ShieldCheck size={18} /></span><div><span className="eyebrow">Doorstep ready</span><h3>Keep your OTP close</h3><p>Your 6-digit code will confirm the final handoff.</p><Link href="/customer/verify" className="text-link text-link-dark">Open verification <ArrowRight size={14} /></Link></div></div><div className="side-card notification-preview"><div className="card-heading"><div><span className="eyebrow">Latest update</span><h3>Delivery started</h3></div><Bell size={17} /></div><p>Ravi has started the journey with your LPG cylinder.</p><span className="muted-note">2 min ago</span></div></aside></div>
  </div>;
}
