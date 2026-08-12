// Warm Terracotta live notification center: shared delivery events arrive instantly with clear unread controls.
import { Bell, Check, CheckCheck, Filter, MapPin, Radio, Route, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { useDelivery } from '../../contexts/DeliveryContext';

const iconMap = { truck: Truck, route: Route, shield: ShieldCheck, check: Check };
export default function Notifications() {
  const [filter, setFilter] = useState('All');
  const { notifications: items, unreadCount, markAllNotificationsRead, markNotificationRead } = useDelivery();
  const filters = ['All', 'Delivery', 'Booking', 'Verification'];
  const visible = items.filter((item) => filter === 'All' || item.type === filter);
  return <div className="standard-page"><div className="page-intro"><div><span className="section-kicker"><span className="live-dot warm-dot" /> Stay in the loop</span><h2>Notification <em>center.</em></h2><p>Useful updates, right when your delivery status changes.</p></div><div className="notification-header-actions"><span className="realtime-badge"><Radio size={13} /> Live sync</span><button className="button button-ghost button-small" onClick={markAllNotificationsRead} disabled={!unreadCount}><CheckCheck size={15} /> Mark all read</button></div></div><div className="filter-row">{filters.map((item) => <button className={'filter-button ' + (filter === item ? 'is-active' : '')} key={item} onClick={() => setFilter(item)}>{item}{item === 'All' && <span>{unreadCount}</span>}</button>)}<span className="filter-spacer" /><span className="filter-meta"><Filter size={15} /> {visible.length} updates</span></div><div className="notification-list">{visible.map((item) => { const Icon = iconMap[item.icon] || Bell; return <article className={'notification-card ' + (item.unread ? 'is-unread' : '')} key={item.id} onClick={() => markNotificationRead(item.id)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') markNotificationRead(item.id); }}><div className="notification-icon"><Icon size={18} /></div><div className="notification-body"><div><span className="eyebrow">{item.type}</span><h3>{item.title}</h3></div><p>{item.body}</p><span className="muted-note">{item.time}</span></div>{item.unread && <span className="unread-dot" />}</article>; })}</div>{visible.length === 0 && <div className="empty-state"><MapPin size={19} /><strong>No updates in this filter.</strong><p>Live delivery events will appear here as the route moves.</p></div>}</div>;
}
