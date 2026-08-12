import { ArrowLeft, ArrowUpRight, Info } from 'lucide-react';
import { Link } from 'wouter';
import ETACard from '../../components/delivery/ETACard';
import DeliveryTimeline from '../../components/delivery/DeliveryTimeline';
import GPSDemoControls from '../../components/delivery/GPSDemoControls';
import LiveMap from '../../components/map/LiveMap';
import { useDelivery } from '../../contexts/DeliveryContext';

export default function Track() {
  const { delivery, routePoints, customer, start, pause, reset } = useDelivery();
  return <div className="tracking-page"><div className="tracking-heading"><div><span className="section-kicker">Live tracking / {delivery.id}</span><h2>Route to <em>your doorstep.</em></h2></div><Link href="/customer/dashboard" className="back-link"><ArrowLeft size={16} /> Overview</Link></div><div className="tracking-layout"><section className="tracking-map-panel"><LiveMap delivery={delivery} routePoints={routePoints} customer={customer} /><GPSDemoControls delivery={delivery} onStart={start} onPause={pause} onReset={reset} /></section><aside className="tracking-side"><ETACard delivery={delivery} dark /><div className="tracking-info-card"><span className="eyebrow">Current status</span><h3>{delivery.status === 'near_you' ? 'Your delivery is near' : delivery.status === 'arrived' ? 'Your agent has arrived' : delivery.status === 'delivered' ? 'Delivery verified' : 'Out for delivery'}</h3><p>{delivery.proximityMessage}</p><div className="mini-route"><span className="route-origin" /><span className="route-dash" /><span className="route-destination" /></div><div className="location-row"><span>Delivery partner</span><strong>Ravi Kumar · {delivery.distanceLabel} away</strong></div><div className="location-row"><span>Delivering to</span><strong>Indiranagar, Bengaluru</strong></div></div><div className="tracking-note"><Info size={16} /><p>Demo GPS is active. In production, this same view will consume secure live location updates.</p></div></aside></div><div className="tracking-timeline"><div className="card-heading"><div><span className="eyebrow">Journey status</span><h3>From booking to doorstep</h3></div><Link href="/customer/verify" className="button button-ghost button-small">Verify when arrived <ArrowUpRight size={14} /></Link></div><DeliveryTimeline status={delivery.status} /></div></div>;
}
