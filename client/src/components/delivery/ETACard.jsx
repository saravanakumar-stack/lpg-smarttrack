import { Clock3, Navigation, Radio } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function ETACard({ delivery, dark = false }) {
  return <section className={'eta-card ' + (dark ? 'eta-card-dark' : '')}>
    <div className="eta-card-top"><StatusBadge tone="live" live>Live delivery</StatusBadge><span className="eta-updated"><Radio size={13} /> 10 sec ago</span></div>
    <div className="eta-main"><div><span className="eyebrow">Delivery arriving</span><strong>{delivery.etaMinutes || '—'}<em> min</em></strong></div><div className="eta-route-icon"><Navigation size={22} /></div></div>
    <div className="eta-meta"><span><Navigation size={14} /> {delivery.distanceLabel}</span><span><Clock3 size={14} /> Updated just now</span></div>
  </section>;
}
