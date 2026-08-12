// Warm Terracotta login system: customer, agent, and admin OTP access share the same secure entry surface.
import { ArrowLeft, ArrowRight, CheckCircle2, LockKeyhole, Mail, Phone, RefreshCw, ShieldCheck, Truck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import BrandLogo from '../components/brand/BrandLogo';
import { useAuth } from '../contexts/AuthContext';

const roleCopy = {
  customer: { label: 'Customer', kicker: 'Customer access', title: 'Customer account', sub: 'Know what is arriving.', description: 'delivery overview', placeholder: '+91 98765 43210', field: 'Mobile number', Icon: Phone },
  agent: { label: 'Agent', kicker: 'Agent access', title: 'Dispatch partner', sub: 'Keep the route moving.', description: 'dispatch workspace', placeholder: 'ravi@smarttrack.demo', field: 'Email or mobile number', Icon: Truck },
  admin: { label: 'Admin', kicker: 'Admin security access', title: 'Security operations', sub: 'Monitor every signal.', description: 'security operations console', placeholder: 'admin@smarttrack.demo', field: 'Admin email', Icon: ShieldCheck },
};

export default function Login() {
  const [, setLocation] = useLocation();
  const { pending, requestOtp, verifyOtp } = useAuth();
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const queryRole = params.get('role');
  const [role, setRole] = useState(queryRole === 'agent' || queryRole === 'admin' ? queryRole : 'customer');
  const [identifier, setIdentifier] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('identifier');
  const [error, setError] = useState('');
  const copy = roleCopy[role];
  const nextPath = params.get('next') || (role === 'agent' ? '/agent/dashboard' : role === 'admin' ? '/admin/dashboard' : '/customer/dashboard');

  function sendOtp(event) { event.preventDefault(); requestOtp(role, identifier); setError(''); setStep('otp'); }
  function submitOtp(event) { event.preventDefault(); const result = verifyOtp(code); if (!result.ok) { setError(result.message); return; } setLocation(nextPath); }
  function changeRole(nextRole) { setRole(nextRole); setIdentifier(''); setError(''); }
  const RoleIcon = copy.Icon;
  return <div className="login-page"><section className="login-brand-side"><Link href="/" className="login-logo"><BrandLogo light /></Link><div className="login-brand-copy"><span className="login-kicker"><span className="live-dot warm-dot" /> Secure route access</span><h1>Every delivery starts with a <em>clear signal.</em></h1><p>Use a one-time passcode to open the SmartTrack customer, delivery partner, or security operations workspace.</p></div><div className="login-palette-card"><div className="palette-orbit" /><span className="palette-label">SMARTTRACK / OTP</span><strong>{copy.title}</strong><small>{copy.sub}</small><div className="palette-stats"><span><b>01</b><small>Verify</small></span><span><b>02</b><small>Monitor</small></span><span><b>03</b><small>Act</small></span></div></div><Link href="/" className="login-back-home"><ArrowLeft size={15} /> Back to overview</Link></section><section className="login-panel"><div className="login-panel-top"><span>DEMO MODE / OTP ENABLED</span><span><ShieldCheck size={14} /> Secure by default</span></div><div className="login-card"><div className="login-card-icon">{step === 'otp' ? <LockKeyhole size={23} /> : <RoleIcon size={23} />}</div>{step === 'identifier' ? <><span className="section-kicker">{copy.kicker}</span><h2>Sign in with <em>OTP.</em></h2><p>We’ll send a six-digit code to your {role === 'customer' ? 'phone number' : 'email address'}.</p><div className="role-tabs role-tabs-three"><button className={role === 'customer' ? 'is-active' : ''} type="button" onClick={() => changeRole('customer')}><Phone size={14} /> Customer</button><button className={role === 'agent' ? 'is-active' : ''} type="button" onClick={() => changeRole('agent')}><Truck size={14} /> Agent</button><button className={role === 'admin' ? 'is-active' : ''} type="button" onClick={() => changeRole('admin')}><ShieldCheck size={14} /> Admin</button></div><form onSubmit={sendOtp} className="login-form"><label htmlFor="identifier">{copy.field}</label><div className="login-input-wrap">{role === 'customer' ? <Phone size={17} /> : <Mail size={17} />}<input id="identifier" value={identifier} onChange={(event) => setIdentifier(event.target.value)} placeholder={copy.placeholder} autoComplete="username" /></div><button className="button button-orange button-wide" type="submit">Send OTP <ArrowRight size={16} /></button></form><span className="login-demo-note"><CheckCircle2 size={14} /> Demo OTP: 123456</span></> : <><button className="login-inline-back" type="button" onClick={() => { setStep('identifier'); setError(''); }}><ArrowLeft size={14} /> Change account</button><span className="section-kicker">Code sent to {pending?.identifier}</span><h2>Enter your <em>signal code.</em></h2><p>Type the six-digit OTP to continue to your {pending?.role === 'admin' ? 'security operations console' : pending?.role === 'agent' ? 'dispatch workspace' : 'delivery overview'}.</p><form onSubmit={submitOtp} className="login-form"><label htmlFor="login-otp">6-digit OTP</label><input id="login-otp" className={'otp-input login-otp-input ' + (error ? 'has-error' : '')} inputMode="numeric" maxLength={6} value={code} onChange={(event) => { setCode(event.target.value.replace(/[^0-9]/g, '')); setError(''); }} placeholder="••••••" autoFocus />{error && <span className="form-error">{error}</span>}<button className="button button-orange button-wide" type="submit">Verify and continue <ArrowRight size={16} /></button></form><button className="resend-button" type="button" onClick={() => { requestOtp(role, identifier); setError(''); }}><RefreshCw size={14} /> Resend OTP</button><span className="login-demo-note"><LockKeyhole size={14} /> Demo code: 123456</span></>}</div><div className="login-footer-note">No password required · Your session is for this demo only</div></section></div>;
}
