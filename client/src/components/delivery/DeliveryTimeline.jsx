import { Check, Circle, MapPin, PackageCheck, Truck } from 'lucide-react';

const steps = [
  ['booked', 'Booked', PackageCheck],
  ['confirmed', 'Confirmed', Check],
  ['assigned', 'Assigned', Circle],
  ['out_for_delivery', 'Out for delivery', Truck],
  ['near_you', 'Near you', MapPin],
  ['delivered', 'Delivered', Check],
];
const order = ['booked', 'confirmed', 'assigned', 'out_for_delivery', 'near_you', 'delivered'];

export default function DeliveryTimeline({ status = 'out_for_delivery' }) {
  const current = order.indexOf(status);
  return <div className="delivery-timeline" aria-label="Delivery journey">
    {steps.map(([key, label, Icon], index) => {
      const done = current >= index;
      const active = key === status;
      return <div className={'timeline-step ' + (done ? 'is-done ' : '') + (active ? 'is-active' : '')} key={key}>
        <span className="timeline-node"><Icon size={14} strokeWidth={2.4} /></span><span>{label}</span>{index < steps.length - 1 && <i className={current > index ? 'line-done' : ''} />}
      </div>;
    })}
  </div>;
}
