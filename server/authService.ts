import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { pool } from './db';

// Normalize phone numbers to canonical format (+91XXXXXXXXXX)
export function normalizePhoneNumber(rawPhone: string): string {
  const cleaned = rawPhone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned}`;
  } else if (cleaned.length > 10) {
    return `+${cleaned}`;
  }
  return rawPhone.trim();
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// In-memory fallback store if DB is temporarily unconfigured or offline
class MemoryStore {
  users: Map<any, any> = new Map();
  profiles: Map<any, any> = new Map();
  preferences: Map<any, any> = new Map();
  savedProperties: Map<any, any[]> = new Map();
  comparisons: Map<any, any[]> = new Map();
  bookings: Map<any, any[]> = new Map();
  reviews: Map<any, any[]> = new Map();
  roommates: Map<any, any> = new Map();
  costs: Map<any, any> = new Map();
  conversations: Map<any, any[]> = new Map();
  messages: Map<any, any[]> = new Map();
  notifications: Map<any, any[]> = new Map();
  ownerProfiles: Map<any, any> = new Map();
  sessions: Map<string, any> = new Map();
  auditLogs: any[] = [];
}

export const memoryStore = new MemoryStore();
