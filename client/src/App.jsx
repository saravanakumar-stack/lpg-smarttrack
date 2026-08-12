// SmartTrack route system: warm OTP access gates the customer and agent workspaces while preserving the shared delivery demo state.
import React from 'react';
import { Redirect, Route, Switch } from 'wouter';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DeliveryProvider } from './contexts/DeliveryContext';
import AppShell from './components/navigation/AppShell';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import Booking from './pages/customer/Booking';
import Track from './pages/customer/Track';
import Notifications from './pages/customer/Notifications';
import History from './pages/customer/History';
import Verify from './pages/customer/Verify';
import CustomerProfile from './pages/customer/Profile';
import AgentDashboard from './pages/agent/AgentDashboard';
import Deliveries from './pages/agent/Deliveries';
import ActiveDelivery from './pages/agent/ActiveDelivery';
import AgentHistory from './pages/agent/History';
import AgentProfile from './pages/agent/Profile';
import AdminDashboard from './pages/admin/Security';
import AdminUsers from './pages/admin/Users';
import AdminDeliveries from './pages/admin/Deliveries';
import AdminSecurity from './pages/admin/Security';

function CustomerRoute({ component: Component }) {
  return <ProtectedRoute role="customer"><AppShell role="customer"><Component /></AppShell></ProtectedRoute>;
}

function AgentRoute({ component: Component }) {
  return <ProtectedRoute role="agent"><AppShell role="agent"><Component /></AppShell></ProtectedRoute>;
}

function AdminRoute({ component: Component }) {
  return <ProtectedRoute role="admin"><AppShell role="admin"><Component /></AppShell></ProtectedRoute>;
}

function ProtectedRoute({ role, children }) {
  const { session } = useAuth();
  if (!session) return <Redirect to={`/login?role=${role}&next=${encodeURIComponent(window.location.pathname)}`} />;
  if (session.role !== role) return <Redirect to={`/login?role=${role}`} />;
  return children;
}

export default function App() {
  return <AuthProvider><DeliveryProvider><Switch>
    <Route path="/" component={Landing} />
    <Route path="/login" component={Login} />
    <Route path="/customer/dashboard">{() => <CustomerRoute component={CustomerDashboard} />}</Route>
    <Route path="/customer/booking">{() => <CustomerRoute component={Booking} />}</Route>
    <Route path="/customer/track">{() => <CustomerRoute component={Track} />}</Route>
    <Route path="/customer/notifications">{() => <CustomerRoute component={Notifications} />}</Route>
    <Route path="/customer/history">{() => <CustomerRoute component={History} />}</Route>
    <Route path="/customer/verify">{() => <CustomerRoute component={Verify} />}</Route>
    <Route path="/customer/profile">{() => <CustomerRoute component={CustomerProfile} />}</Route>
    <Route path="/agent/dashboard">{() => <AgentRoute component={AgentDashboard} />}</Route>
    <Route path="/agent/deliveries">{() => <AgentRoute component={Deliveries} />}</Route>
    <Route path="/agent/active">{() => <AgentRoute component={ActiveDelivery} />}</Route>
    <Route path="/agent/notifications">{() => <AgentRoute component={Notifications} />}</Route>
    <Route path="/agent/history">{() => <AgentRoute component={AgentHistory} />}</Route>
    <Route path="/agent/profile">{() => <AgentRoute component={AgentProfile} />}</Route>
    <Route path="/admin/dashboard">{() => <AdminRoute component={AdminDashboard} />}</Route>
    <Route path="/admin/users">{() => <AdminRoute component={AdminUsers} />}</Route>
    <Route path="/admin/deliveries">{() => <AdminRoute component={AdminDeliveries} />}</Route>
    <Route path="/admin/security">{() => <AdminRoute component={AdminSecurity} />}</Route>
    <Route>Not found</Route>
  </Switch></DeliveryProvider></AuthProvider>;
}
