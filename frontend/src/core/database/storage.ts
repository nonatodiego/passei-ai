export type AppEnvironment = 'local' | 'preview' | 'production';

export interface StorageInfo {
  environment: AppEnvironment;
  origin: string;
  persisted: boolean | null;
  quota?: number;
  usage?: number;
  supported: boolean;
}

export function getAppEnvironment(hostname = window.location.hostname): AppEnvironment {
  if (hostname === 'localhost' || hostname === '127.0.0.1') return 'local';
  if (hostname.endsWith('.vercel.app')) return 'preview';
  return 'production';
}

export async function getStorageInfo(): Promise<StorageInfo> {
  const supported = Boolean(navigator.storage);
  const environment = getAppEnvironment();
  if (!supported) return { environment, origin: window.location.origin, persisted: null, supported };
  const [persisted, estimate] = await Promise.all([
    navigator.storage.persisted?.() ?? Promise.resolve(false),
    navigator.storage.estimate?.() ?? Promise.resolve({}),
  ]);
  return { environment, origin: window.location.origin, persisted, quota: estimate.quota, usage: estimate.usage, supported };
}

export async function requestPersistentStorage(): Promise<boolean | null> {
  if (!navigator.storage?.persist) return null;
  return navigator.storage.persist();
}
