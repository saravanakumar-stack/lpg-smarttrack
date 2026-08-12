import { Pause, Play, RotateCcw } from 'lucide-react';

export default function GPSDemoControls({ delivery, onStart, onPause, onReset }) {
  return <div className="gps-controls"><div><span className="live-dot" /> <strong>Demo GPS {delivery.isRunning ? 'active' : 'ready'}</strong><small>Shared with customer view</small></div><div className="control-buttons"><button className="control-button" onClick={onReset} aria-label="Reset demo GPS"><RotateCcw size={15} /></button>{delivery.isRunning ? <button className="button button-dark" onClick={onPause}><Pause size={15} /> Pause</button> : <button className="button button-primary" onClick={onStart}><Play size={15} /> Start demo</button>}</div></div>;
}
