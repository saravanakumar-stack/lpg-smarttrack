// Warm Terracotta handoff: OTP verification resolves into a human feedback moment, not a generic success state.
import { Check, LockKeyhole, RefreshCw, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import FeedbackCard from '../../components/delivery/FeedbackCard';
import { useDelivery } from '../../contexts/DeliveryContext';

export default function Verify() {
  const { verify, delivery, feedback, submitFeedback } = useDelivery();
  const [code, setCode] = useState('');
  const [state, setState] = useState('idle');
  function submit(event) { event.preventDefault(); if (code === '123456') { setState('success'); verify(); } else setState('error'); }
  const verified = state === 'success' || delivery.status === 'delivered';
  return <div className="verify-page"><div className="verify-panel"><div className="verify-icon"><ShieldCheck size={28} /></div><span className="section-kicker">Secure handoff / {delivery.id}</span>{verified ? <><h2>Delivery <em>verified.</em></h2><p>Your LPG delivery has been successfully confirmed. Close the loop with a quick rating for Ravi’s delivery.</p><div className="verified-stamp"><Check size={22} /><div><strong>Delivery verified</strong><span>OTP matched · 12 Aug 2026</span></div></div><FeedbackCard feedback={feedback} onSubmit={submitFeedback} /><Link href="/customer/history" className="button button-primary button-wide">View delivery history</Link></> : <><h2>Confirm your <em>delivery.</em></h2><p>Enter the OTP provided to the delivery agent to confirm successful delivery.</p><form onSubmit={submit}><label className="otp-label" htmlFor="otp">6-digit verification code</label><input id="otp" className={'otp-input ' + (state === 'error' ? 'has-error' : '')} inputMode="numeric" maxLength={6} value={code} onChange={(event) => { setCode(event.target.value.replace(/[^0-9]/g, '')); setState('idle'); }} placeholder="••••••" autoFocus /><span className="otp-hint"><LockKeyhole size={13} /> Demo OTP: 123456</span>{state === 'error' && <span className="form-error">That code doesn’t match. Try the demo code above.</span>}<button className="button button-orange button-wide" type="submit">Verify delivery <Check size={16} /></button></form><button className="resend-button" type="button"><RefreshCw size={14} /> Resend OTP</button></>}</div><div className="verify-side"><span className="live-dot warm-dot" /><strong>{verified ? 'Your signal matters' : 'One last step'}</strong><p>{verified ? 'A quick rating makes the next doorstep handoff even better.' : 'OTP verification gives both you and the delivery partner a clear record of a successful handoff.'}</p><div className="verify-side-line"><span /><span /><span /></div></div></div>;
}
