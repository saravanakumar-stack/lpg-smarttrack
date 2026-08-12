// Admin monitoring fixtures: operational demo records only; no customer reviews or fabricated testimonials.
export const adminUsers = [
  { id: 'USR-1042', name: 'Ananya Rao', role: 'Customer', email: 'ananya@smarttrack.demo', phone: '+91 98765 43210', status: 'Active', verification: 'Email verified', lastSeen: 'Just now' },
  { id: 'AGT-001', name: 'Ravi Kumar', role: 'Agent', email: 'ravi@smarttrack.demo', phone: '+91 90123 45678', status: 'On route', verification: 'Email verified', lastSeen: '2 min ago' },
  { id: 'USR-1186', name: 'Kiran Shah', role: 'Customer', email: 'kiran@smarttrack.demo', phone: '+91 99887 66554', status: 'Active', verification: 'Pending email', lastSeen: '7 min ago' },
  { id: 'AGT-014', name: 'Neha Iyer', role: 'Agent', email: 'neha@smarttrack.demo', phone: '+91 91234 55667', status: 'Offline', verification: 'Email verified', lastSeen: '41 min ago' },
];

export const adminDeliveries = [
  { id: 'DEL-240812-01', customer: 'Ananya Rao', agent: 'Ravi Kumar', zone: 'Indiranagar', status: 'Out for delivery', eta: '14 min', risk: 'Low', updated: 'Just now' },
  { id: 'DEL-240812-02', customer: 'Kiran Shah', agent: 'Neha Iyer', zone: 'Koramangala', status: 'Assigned', eta: '—', risk: 'Medium', updated: '7 min ago' },
  { id: 'DEL-240811-18', customer: 'Suresh Menon', agent: 'Ravi Kumar', zone: 'Ulsoor', status: 'Delivered', eta: 'Completed', risk: 'Low', updated: 'Yesterday' },
  { id: 'DEL-240811-17', customer: 'Meera Nair', agent: 'Neha Iyer', zone: 'Domlur', status: 'Flagged', eta: 'Review', risk: 'High', updated: 'Yesterday' },
];
