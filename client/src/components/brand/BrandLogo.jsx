export default function BrandLogo({ compact = false }) {
  return (
    <div className="brand-lockup">
      <span className="brand-mark brand-mark-image" aria-hidden="true">
        <img src="/manus-storage/lpg-smarttrack-logo_f276663c.png" alt="" />
      </span>
      {!compact && <span className="brand-name"><strong>LPG</strong><b>SmartTrack</b></span>}
    </div>
  );
}
