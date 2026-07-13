const DATA_CHANGE_EVENT = 'passei-ai:local-data-change';

export function publishLocalDataChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(DATA_CHANGE_EVENT));
  }
}

export function subscribeToLocalDataChanges(listener: () => void) {
  if (typeof window === 'undefined') return () => undefined;
  window.addEventListener(DATA_CHANGE_EVENT, listener);
  return () => window.removeEventListener(DATA_CHANGE_EVENT, listener);
}
