// Warm Terracotta security auth: customer, agent, and admin OTP access with persisted profiles and email verification state.
import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'lpg-smarttrack-demo-session';
const PROFILE_KEY = 'lpg-smarttrack-demo-profiles';
const EMAIL_KEY = 'lpg-smarttrack-demo-email-status';
const defaultProfiles = {
  customer: { name: 'Ananya Rao', phone: '+91 98765 43210', address: '18, 4th Cross, Indiranagar', email: 'ananya@smarttrack.demo' },
  agent: { name: 'Ravi Kumar', phone: '+91 90123 45678', vehicle: 'KA 03 MJ 8271 · Delivery van', zone: 'East Bengaluru', email: 'ravi@smarttrack.demo' },
  admin: { name: 'Maya Desai', phone: '+91 90000 11223', email: 'admin@smarttrack.demo', title: 'Security operations lead' },
};
const defaultEmailStatus = { customer: false, agent: false, admin: false };

function readStorage(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (_error) {
    return fallback;
  }
}
function readSession() { return readStorage(STORAGE_KEY, null); }

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);
  const [pending, setPending] = useState(null);
  const [emailChallenge, setEmailChallenge] = useState(null);
  const [profiles, setProfiles] = useState(() => ({ ...defaultProfiles, ...readStorage(PROFILE_KEY, {}) }));
  const [emailStatus, setEmailStatus] = useState(() => ({ ...defaultEmailStatus, ...readStorage(EMAIL_KEY, {}) }));

  function requestOtp(role, identifier) {
    const normalized = identifier.trim() || defaultProfiles[role]?.email || defaultProfiles.customer.email;
    setPending({ role, identifier: normalized });
    return normalized;
  }
  function verifyOtp(code) {
    if (!pending) return { ok: false, message: 'Request a new OTP first.' };
    if (code !== '123456') return { ok: false, message: 'That code does not match the demo OTP.' };
    const nextSession = { role: pending.role, identifier: pending.identifier, verifiedAt: new Date().toISOString() };
    setSession(nextSession);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    setPending(null);
    return { ok: true };
  }
  function updateProfile(role, updates) {
    setProfiles((current) => {
      const next = { ...current, [role]: { ...current[role], ...updates } };
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      return next;
    });
  }
  function requestEmailVerification(role = session?.role || 'customer') {
    const email = profiles[role]?.email || '';
    setEmailChallenge({ role, email });
    return email;
  }
  function verifyEmail(code) {
    if (!emailChallenge) return { ok: false, message: 'Request a verification email first.' };
    if (code !== '654321') return { ok: false, message: 'That code does not match the demo email code.' };
    setEmailStatus((current) => {
      const next = { ...current, [emailChallenge.role]: true };
      window.localStorage.setItem(EMAIL_KEY, JSON.stringify(next));
      return next;
    });
    setEmailChallenge(null);
    return { ok: true };
  }
  function logout() {
    setSession(null);
    setPending(null);
    setEmailChallenge(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }
  const activeRole = session?.role || 'customer';
  const value = useMemo(() => ({ session, pending, emailChallenge, emailStatus, profile: profiles[activeRole], profiles, requestOtp, verifyOtp, updateProfile, requestEmailVerification, verifyEmail, logout }), [session, pending, emailChallenge, emailStatus, profiles, activeRole]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
