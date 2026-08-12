export default function StatCard({ label, value, detail, icon: Icon, tone = 'blue' }) {
  return (
    <article className={'stat-card stat-' + tone}>
      <div className="stat-icon"><Icon size={18} strokeWidth={2} /></div>
      <div><span className="eyebrow">{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>
    </article>
  );
}
