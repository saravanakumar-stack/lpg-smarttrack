const listeners = new Map();

export const socketService = {
  subscribe(event, listener) {
    const entries = listeners.get(event) || [];
    entries.push(listener);
    listeners.set(event, entries);
    return () => listeners.set(event, entries.filter((item) => item !== listener));
  },
  emit(event, payload) {
    (listeners.get(event) || []).forEach((listener) => listener(payload));
  },
  connect() {
    return { mode: 'demo', note: 'Socket.IO transport can replace this adapter later.' };
  },
};
