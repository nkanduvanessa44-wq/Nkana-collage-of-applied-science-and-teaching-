/**
 * Security, Encryption (AES-GCM) and Real-time Synchronization Utility
 * Nkana College Of Applied Sciences And Education
 */

// Secret encryption salt and key derivation for local storage security
const STORAGE_PREFIX = 'nkana_college_hostel_';
const BROADCAST_CHANNEL_NAME = 'nkana_hostel_realtime_sync';

// Masking utilities to protect sensitive student records (RBAC)
export function maskNRC(nrc: string, isAuthorized: boolean): string {
  if (isAuthorized) return nrc;
  if (!nrc) return '***';
  const parts = nrc.split('/');
  if (parts.length >= 3) {
    return `${parts[0].slice(0, 3)}***/${parts[1].slice(0, 1)}*/${parts[2]}`;
  }
  return nrc.slice(0, 2) + '****' + nrc.slice(-2);
}

export function maskPhone(phone: string, isAuthorized: boolean): string {
  if (isAuthorized) return phone;
  if (!phone) return '***';
  const cleaned = phone.replace(/\s+/g, '');
  if (cleaned.length > 6) {
    return cleaned.slice(0, 5) + '****' + cleaned.slice(-3);
  }
  return '****' + cleaned.slice(-2);
}

// Client-side lightweight AES-GCM simulation for in-browser encrypted persistence
export async function encryptData(plaintext: string): Promise<string> {
  try {
    if (!window.crypto || !window.crypto.subtle) {
      return btoa(unescape(encodeURIComponent(plaintext)));
    }
    const enc = new TextEncoder();
    const encoded = enc.encode(plaintext);
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode('NKANA-COLLEGE-SECURE-KEY-2026!'),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    const salt = enc.encode('nkana-sciences-salt');
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 10000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...combined));
  } catch (err) {
    console.warn('Encryption fallback used:', err);
    return btoa(encodeURIComponent(plaintext));
  }
}

export async function decryptData(ciphertext: string): Promise<string> {
  try {
    if (!window.crypto || !window.crypto.subtle) {
      return decodeURIComponent(escape(atob(ciphertext)));
    }
    const binary = atob(ciphertext);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const iv = bytes.slice(0, 12);
    const data = bytes.slice(12);

    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode('NKANA-COLLEGE-SECURE-KEY-2026!'),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    const salt = enc.encode('nkana-sciences-salt');
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 10000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    return new TextDecoder().decode(decrypted);
  } catch (err) {
    try {
      return decodeURIComponent(atob(ciphertext));
    } catch {
      return '';
    }
  }
}

// Real-Time Cross-Device / Multi-Tab Synchronization
type SyncCallback = (event: { type: string; payload: any; timestamp: number }) => void;

class RealtimeSyncManager {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<SyncCallback> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        this.channel.onmessage = (event) => {
          this.notifyListeners(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel not available, using storage event fallback', e);
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === `${STORAGE_PREFIX}sync_trigger` && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            this.notifyListeners(data);
          } catch {
            // ignore
          }
        }
      });
    }
  }

  public subscribe(cb: SyncCallback): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public broadcast(type: string, payload: any) {
    const event = {
      type,
      payload,
      timestamp: Date.now()
    };

    if (this.channel) {
      try {
        this.channel.postMessage(event);
      } catch (e) {
        console.error('Failed to postMessage on BroadcastChannel', e);
      }
    }

    // Trigger localStorage event as fallback
    try {
      localStorage.setItem(`${STORAGE_PREFIX}sync_trigger`, JSON.stringify(event));
    } catch {
      // ignore
    }

    // Call local listeners as well
    this.notifyListeners(event);
  }

  private notifyListeners(data: any) {
    this.listeners.forEach((listener) => {
      try {
        listener(data);
      } catch (err) {
        console.error('Error in sync listener:', err);
      }
    });
  }
}

export const realtimeSync = new RealtimeSyncManager();
