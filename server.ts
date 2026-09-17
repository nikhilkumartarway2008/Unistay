import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import pkg from 'pg';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Database Connection
const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
});

let isConnected = false;
pool.connect((err, client, release) => {
  if (err) {
    console.warn("PostgreSQL connection warning (falling back to memory store):", err.message);
    isConnected = false;
  } else {
    isConnected = true;
    console.log("Connected to PostgreSQL successfully.");
    release();
  }
});

function getIsConnected() {
  return isConnected;
}

// In-memory fallback store
const memoryStore = {
  users: new Map(),
  profiles: new Map(),
  preferences: new Map(),
  costs: new Map(),
  savedProperties: new Map(),
  sessions: new Map(),
  bookings: new Map(),
  ownerProperties: new Map(),
  maintenance: new Map()
};

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function normalizePhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length > 10) {
    return cleaned.slice(-10);
  }
  return cleaned;
}

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Auth Middleware
async function authenticateUser(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Authentication token required." });
  }
  const token = authHeader.split(' ')[1];

  if (getIsConnected()) {
    try {
      const sessionRes = await pool.query(
        `SELECT s.*, u.phone_number, u.role, p.full_name, p.university_id, p.city_id 
         FROM sessions s 
         JOIN users u ON s.user_id = u.id 
         LEFT JOIN profiles p ON u.id = p.user_id 
         WHERE s.token = $1 AND s.expires_at > NOW()`,
        [token]
      );
      if (sessionRes.rows.length === 0) {
        return res.status(401).json({ error: "Invalid or expired session token." });
      }
      req.user = {
        id: sessionRes.rows[0].user_id,
        phoneNumber: sessionRes.rows[0].phone_number,
        role: sessionRes.rows[0].role,
        fullName: sessionRes.rows[0].full_name || 'UniStay User',
        universityId: sessionRes.rows[0].university_id || 'DU',
        cityId: sessionRes.rows[0].city_id || 'Delhi'
      };
      next();
    } catch (err: any) {
      return res.status(500).json({ error: "Authentication verification failed." });
    }
  } else {
    let foundUser: any = null;
    let foundUserId = '';
    for (const [uId, s] of memoryStore.sessions.entries()) {
      if (s.token === token && s.expires_at > new Date()) {
        foundUserId = uId;
        foundUser = memoryStore.users.get(uId);
        break;
      }
    }
    if (!foundUser) {
      return res.status(401).json({ error: "Invalid or expired session token." });
    }
    const profile = memoryStore.profiles.get(foundUserId);
    req.user = {
      id: foundUserId,
      phoneNumber: foundUser.phone_number,
      role: foundUser.role,
      fullName: profile?.full_name || 'UniStay User',
      universityId: profile?.university_id || 'DU',
      cityId: profile?.city_id || 'Delhi'
    };
    next();
  }
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes FIRST

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { fullName, phoneNumber, password, role = 'STUDENT', universityId, cityId, securityQuestion, securityAnswer } = req.body;
    if (!phoneNumber || !password || !fullName || !securityQuestion || !securityAnswer) {
      return res.status(400).json({ error: "Full name, phone number, password, security question, and answer are required." });
    }

    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    const hashedPassword = await hashPassword(password);
    const hashedSecurityAnswer = await hashPassword(securityAnswer.toLowerCase().trim());

    if (getIsConnected()) {
      const existing = await pool.query("SELECT id FROM users WHERE phone_number = $1", [normalizedPhone]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ error: "An account with this phone number already exists." });
      }

      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const userRes = await client.query(
          `INSERT INTO users (phone_number, password_hash, security_question, security_answer_hash, role, phone_verified) 
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, phone_number, role, status, created_at`,
          [normalizedPhone, hashedPassword, securityQuestion, hashedSecurityAnswer, role, true]
        );
        const newUser = userRes.rows[0];

        await client.query(
          `INSERT INTO profiles (user_id, full_name, university_id, city_id) VALUES ($1, $2, $3, $4)`,
          [newUser.id, fullName, universityId || 'DU', cityId || 'Delhi']
        );

        await client.query(
          `INSERT INTO student_preferences (user_id, budget_min, budget_max, university_id) VALUES ($1, 5000, 25000, $2) ON CONFLICT (user_id) DO NOTHING`,
          [newUser.id, universityId || 'DU']
        );

        const token = generateSessionToken();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await client.query(
          `INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)`,
          [newUser.id, token, expiresAt]
        );

        await client.query("COMMIT");
        client.release();

        return res.json({
          token,
          user: {
            id: newUser.id,
            phoneNumber: newUser.phone_number,
            role: newUser.role,
            fullName,
            universityId: universityId || 'DU',
            cityId: cityId || 'Delhi'
          }
        });
      } catch (txErr) {
        await client.query("ROLLBACK");
        client.release();
        throw txErr;
      }
    } else {
      for (const u of memoryStore.users.values()) {
        if (u.phone_number === normalizedPhone) {
          return res.status(400).json({ error: "An account with this phone number already exists." });
        }
      }

      const userId = `user_${Date.now()}`;
      const newUser = {
        id: userId,
        phone_number: normalizedPhone,
        password_hash: hashedPassword,
        security_question: securityQuestion,
        security_answer_hash: hashedSecurityAnswer,
        role,
        status: 'ACTIVE',
        phone_verified: true,
        created_at: new Date()
      };
      memoryStore.users.set(userId, newUser);
      memoryStore.profiles.set(userId, {
        user_id: userId,
        full_name: fullName,
        university_id: universityId || 'DU',
        city_id: cityId || 'Delhi'
      });
      memoryStore.preferences.set(userId, { budget_min: 5000, budget_max: 25000 });
      memoryStore.costs.set(userId, { food_budget: 4500, transport_budget: 1500 });

      const token = generateSessionToken();
      memoryStore.sessions.set(userId, { token, expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000) });

      return res.json({
        token,
        user: {
          id: userId,
          phoneNumber: normalizedPhone,
          role,
          fullName,
          universityId: universityId || 'DU',
          cityId: cityId || 'Delhi'
        }
      });
    }
  } catch (err: any) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message || "Signup failed." });
  }
});

app.post("/api/auth/get-security-question", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) return res.status(400).json({ error: "Phone number is required." });
    const normalizedPhone = normalizePhoneNumber(phoneNumber);

    if (getIsConnected()) {
      const r = await pool.query("SELECT security_question FROM users WHERE phone_number = $1", [normalizedPhone]);
      if (r.rows.length === 0 || !r.rows[0].security_question) {
        return res.status(404).json({ error: "No account found with this phone number or security question not set." });
      }
      return res.json({ securityQuestion: r.rows[0].security_question });
    } else {
      for (const u of memoryStore.users.values()) {
        if (u.phone_number === normalizedPhone) {
          if (!u.security_question) {
            return res.status(404).json({ error: "Security question not set for this account." });
          }
          return res.json({ securityQuestion: u.security_question });
        }
      }
      return res.status(404).json({ error: "Account not found with this phone number." });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to retrieve security question." });
  }
});

app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { phoneNumber, securityAnswer, newPassword } = req.body;
    if (!phoneNumber || !securityAnswer || !newPassword) {
      return res.status(400).json({ error: "Phone number, security answer, and new password are required." });
    }
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    const newHashedPassword = await hashPassword(newPassword);

    if (getIsConnected()) {
      const r = await pool.query("SELECT id, security_answer_hash FROM users WHERE phone_number = $1", [normalizedPhone]);
      if (r.rows.length === 0) {
        return res.status(404).json({ error: "Account not found." });
      }
      const user = r.rows[0];
      const validAnswer = await verifyPassword(securityAnswer.toLowerCase().trim(), user.security_answer_hash);
      if (!validAnswer) {
        return res.status(400).json({ error: "Incorrect security question answer." });
      }
      await pool.query("UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2", [newHashedPassword, user.id]);
      return res.json({ success: true, message: "Password reset successfully. You can now login with your new password." });
    } else {
      let foundUser: any = null;
      for (const u of memoryStore.users.values()) {
        if (u.phone_number === normalizedPhone) {
          foundUser = u;
          break;
        }
      }
      if (!foundUser) {
        return res.status(404).json({ error: "Account not found." });
      }
      const validAnswer = await verifyPassword(securityAnswer.toLowerCase().trim(), foundUser.security_answer_hash);
      if (!validAnswer) {
        return res.status(400).json({ error: "Incorrect security question answer." });
      }
      foundUser.password_hash = newHashedPassword;
      return res.json({ success: true, message: "Password reset successfully. You can now login with your new password." });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Password reset failed." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      return res.status(400).json({ error: "Phone number and password are required." });
    }

    const normalizedPhone = normalizePhoneNumber(phoneNumber);

    if (getIsConnected()) {
      const userRes = await pool.query(
        `SELECT u.*, p.full_name, p.university_id, p.city_id, p.profile_photo_url 
         FROM users u 
         LEFT JOIN profiles p ON u.id = p.user_id 
         WHERE u.phone_number = $1`,
        [normalizedPhone]
      );

      if (userRes.rows.length === 0) {
        return res.status(401).json({ error: "Phone number or password is incorrect." });
      }

      const user = userRes.rows[0];
      const validPassword = await verifyPassword(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: "Phone number or password is incorrect." });
      }

      const token = generateSessionToken();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await pool.query(
        `INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)`,
        [user.id, token, expiresAt]
      );
      await pool.query(`UPDATE users SET last_login_at = NOW() WHERE id = $1`, [user.id]);

      return res.json({
        token,
        user: {
          id: user.id,
          phoneNumber: user.phone_number,
          role: user.role,
          fullName: user.full_name || 'UniStay User',
          universityId: user.university_id || 'DU',
          cityId: user.city_id || 'Delhi',
          profilePhotoUrl: user.profile_photo_url
        }
      });
    } else {
      let foundUser: any = null;
      let foundUserId = '';
      for (const [uId, u] of memoryStore.users.entries()) {
        if (u.phone_number === normalizedPhone) {
          foundUser = u;
          foundUserId = uId;
          break;
        }
      }
      if (!foundUser) {
        return res.status(401).json({ error: "Phone number or password is incorrect." });
      }
      const valid = await verifyPassword(password, foundUser.password_hash);
      if (!valid) {
        return res.status(401).json({ error: "Phone number or password is incorrect." });
      }

      const profile = memoryStore.profiles.get(foundUserId);
      const token = generateSessionToken();
      memoryStore.sessions.set(foundUserId, { token, expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000) });

      return res.json({
        token,
        user: {
          id: foundUserId,
          phoneNumber: foundUser.phone_number,
          role: foundUser.role,
          fullName: profile?.full_name || 'UniStay User',
          universityId: profile?.university_id || 'DU',
          cityId: profile?.city_id || 'Delhi'
        }
      });
    }
  } catch (err: any) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message || "Login failed." });
  }
});

app.get("/api/auth/session", authenticateUser, async (req: any, res) => {
  try {
    const userId = req.user.id;
    if (getIsConnected()) {
      const userRes = await pool.query(
        `SELECT u.id, u.phone_number, u.role, u.status, p.full_name, p.university_id, p.city_id, p.bio, p.profile_photo_url 
         FROM users u 
         LEFT JOIN profiles p ON u.id = p.user_id 
         WHERE u.id = $1`,
        [userId]
      );
      if (userRes.rows.length === 0) return res.status(404).json({ error: "User not found" });
      const u = userRes.rows[0];
      return res.json({
        id: u.id,
        phoneNumber: u.phone_number,
        role: u.role,
        fullName: u.full_name || 'UniStay User',
        universityId: u.university_id || 'DU',
        cityId: u.city_id || 'Delhi',
        bio: u.bio,
        profilePhotoUrl: u.profile_photo_url
      });
    } else {
      const user = memoryStore.users.get(userId);
      const profile = memoryStore.profiles.get(userId) || {};
      return res.json({
        id: userId,
        phoneNumber: user?.phone_number,
        role: user?.role || 'STUDENT',
        fullName: profile.full_name || 'UniStay User',
        universityId: profile.university_id || 'DU',
        cityId: profile.city_id || 'Delhi',
        bio: profile.bio,
        profilePhotoUrl: profile.profile_photo_url
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch session." });
  }
});

app.get("/api/profile", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  if (getIsConnected()) {
    const r = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [userId]);
    res.json(r.rows[0] || {});
  } else {
    res.json(memoryStore.profiles.get(userId) || {});
  }
});

app.put("/api/profile", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  const { fullName, universityId, cityId, bio, profilePhotoUrl } = req.body;
  if (getIsConnected()) {
    await pool.query(
      `INSERT INTO profiles (user_id, full_name, university_id, city_id, bio, profile_photo_url, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (user_id) DO UPDATE SET
       full_name = COALESCE($2, profiles.full_name),
       university_id = COALESCE($3, profiles.university_id),
       city_id = COALESCE($4, profiles.city_id),
       bio = COALESCE($5, profiles.bio),
       profile_photo_url = COALESCE($6, profiles.profile_photo_url),
       updated_at = NOW()`,
      [userId, fullName, universityId, cityId, bio, profilePhotoUrl]
    );
    const updated = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [userId]);
    res.json(updated.rows[0]);
  } else {
    const existing = memoryStore.profiles.get(userId) || {};
    const merged = { ...existing, fullName, universityId, cityId, bio, profilePhotoUrl, updated_at: new Date() };
    memoryStore.profiles.set(userId, merged);
    res.json(merged);
  }
});

app.get("/api/profile/preferences", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  if (getIsConnected()) {
    const r = await pool.query("SELECT * FROM student_preferences WHERE user_id = $1", [userId]);
    res.json(r.rows[0] || {});
  } else {
    res.json(memoryStore.preferences.get(userId) || {});
  }
});

app.put("/api/profile/preferences", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  const prefs = req.body;
  if (getIsConnected()) {
    await pool.query(
      `INSERT INTO student_preferences (user_id, budget_min, budget_max, preferred_city_id, preferred_area_id, university_id, room_type, food_preference, wifi_required, furnished_required)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (user_id) DO UPDATE SET 
       budget_min = COALESCE($2, student_preferences.budget_min),
       budget_max = COALESCE($3, student_preferences.budget_max),
       preferred_city_id = COALESCE($4, student_preferences.preferred_city_id),
       preferred_area_id = COALESCE($5, student_preferences.preferred_area_id),
       university_id = COALESCE($6, student_preferences.university_id),
       room_type = COALESCE($7, student_preferences.room_type),
       food_preference = COALESCE($8, student_preferences.food_preference),
       wifi_required = COALESCE($9, student_preferences.wifi_required),
       furnished_required = COALESCE($10, student_preferences.furnished_required),
       updated_at = NOW()`,
      [userId, prefs.budgetMin, prefs.budgetMax, prefs.preferredCityId, prefs.preferredAreaId, prefs.universityId, prefs.roomType, prefs.foodPreference, prefs.wifiRequired, prefs.furnishedRequired]
    );
    const updated = await pool.query("SELECT * FROM student_preferences WHERE user_id = $1", [userId]);
    res.json(updated.rows[0]);
  } else {
    memoryStore.preferences.set(userId, prefs);
    res.json(prefs);
  }
});

app.get("/api/properties/saved", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  if (getIsConnected()) {
    const r = await pool.query("SELECT property_id, created_at FROM saved_properties WHERE user_id = $1", [userId]);
    res.json(r.rows);
  } else {
    res.json(memoryStore.savedProperties.get(userId) || []);
  }
});

app.post("/api/properties/saved", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  const { propertyId } = req.body;
  if (!propertyId) return res.status(400).json({ error: "propertyId is required." });

  if (getIsConnected()) {
    await pool.query(
      `INSERT INTO saved_properties (user_id, property_id) VALUES ($1, $2) ON CONFLICT (user_id, property_id) DO NOTHING`,
      [userId, propertyId]
    );
    const r = await pool.query("SELECT property_id, created_at FROM saved_properties WHERE user_id = $1", [userId]);
    res.json(r.rows);
  } else {
    let list = memoryStore.savedProperties.get(userId) || [];
    if (!list.some(item => item.property_id === propertyId)) {
      list.push({ property_id: propertyId, created_at: new Date() });
      memoryStore.savedProperties.set(userId, list);
    }
    res.json(list);
  }
});

app.delete("/api/properties/saved/:propertyId", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  const propertyId = req.params.propertyId;
  if (getIsConnected()) {
    await pool.query("DELETE FROM saved_properties WHERE user_id = $1 AND property_id = $2", [userId, propertyId]);
    const r = await pool.query("SELECT property_id, created_at FROM saved_properties WHERE user_id = $1", [userId]);
    res.json(r.rows);
  } else {
    let list = memoryStore.savedProperties.get(userId) || [];
    list = list.filter(item => item.property_id !== propertyId);
    memoryStore.savedProperties.set(userId, list);
    res.json(list);
  }
});

app.get("/api/owner/properties", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  if (getIsConnected()) {
    const r = await pool.query("SELECT * FROM owner_properties WHERE owner_id = $1 ORDER BY created_at DESC", [userId]);
    res.json(r.rows);
  } else {
    const ownerProps = (memoryStore as any).ownerProperties || new Map();
    res.json(ownerProps.get(userId) || []);
  }
});

app.post("/api/owner/properties", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  const { propertyName, propertyType, address, area, city, universityId, description, rent, securityDeposit, amenities, roomTypes, status = 'PUBLISHED' } = req.body;
  
  if (!propertyName || !rent || !city) {
    return res.status(400).json({ error: "Property name, rent, and city are required." });
  }

  if (getIsConnected()) {
    const r = await pool.query(
      `INSERT INTO owner_properties (owner_id, property_name, property_type, address, area, city, university_id, description, rent, security_deposit, amenities, room_types, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [userId, propertyName, propertyType || 'PG', address || 'Campus Area', area || 'Civil Lines', city || 'Delhi', universityId || 'DU', description, rent, securityDeposit || 0, amenities || [], roomTypes || ['Single Room'], status]
    );
    res.json(r.rows[0]);
  } else {
    const ownerProps = (memoryStore as any).ownerProperties || ((memoryStore as any).ownerProperties = new Map());
    const list = ownerProps.get(userId) || [];
    const newProp = {
      id: `prop_${Date.now()}`,
      owner_id: userId,
      property_name: propertyName,
      property_type: propertyType || 'PG',
      address,
      area,
      city,
      university_id: universityId || 'DU',
      description,
      rent,
      security_deposit: securityDeposit || 0,
      amenities: amenities || [],
      room_types: roomTypes || ['Single Room'],
      status: status || 'PUBLISHED',
      created_at: new Date()
    };
    list.push(newProp);
    ownerProps.set(userId, list);
    res.json(newProp);
  }
});

app.get("/api/properties/discover", async (req, res) => {
  const { city, university, maxRent, type } = req.query;
  if (getIsConnected()) {
    let query = "SELECT * FROM owner_properties WHERE status = 'PUBLISHED'";
    let params: any[] = [];
    let idx = 1;

    if (city) {
      query += ` AND city ILIKE $${idx++}`;
      params.push(`%${city}%`);
    }
    if (university) {
      query += ` AND university_id = $${idx++}`;
      params.push(university);
    }
    if (maxRent) {
      query += ` AND rent <= $${idx++}`;
      params.push(Number(maxRent));
    }
    if (type) {
      query += ` AND property_type = $${idx++}`;
      params.push(type);
    }

    const r = await pool.query(query, params);
    res.json(r.rows);
  } else {
    let allProps: any[] = [];
    const ownerProps = (memoryStore as any).ownerProperties || new Map();
    for (const list of ownerProps.values()) {
      allProps.push(...list.filter((p: any) => p.status === 'PUBLISHED'));
    }
    res.json(allProps);
  }
});

app.get("/api/bookings", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  if (getIsConnected()) {
    const r = await pool.query("SELECT * FROM bookings WHERE student_id = $1 ORDER BY created_at DESC", [userId]);
    res.json(r.rows);
  } else {
    res.json(memoryStore.bookings.get(userId) || []);
  }
});

app.post("/api/bookings", authenticateUser, async (req: any, res) => {
  const userId = req.user.id;
  const { propertyId, roomId, moveInDate, moveOutDate, amount } = req.body;
  if (getIsConnected()) {
    const r = await pool.query(
      `INSERT INTO bookings (student_id, property_id, room_id, booking_status, move_in_date, move_out_date, amount)
       VALUES ($1, $2, $3, 'CONFIRMED', $4, $5, $6) RETURNING *`,
      [userId, propertyId, roomId || 'Standard Room', moveInDate, moveOutDate, amount || 12000]
    );
    res.json(r.rows[0]);
  } else {
    const list = memoryStore.bookings.get(userId) || [];
    const newBooking = { id: `b_${Date.now()}`, student_id: userId, property_id: propertyId, booking_status: 'CONFIRMED', move_in_date: moveInDate, amount: amount || 12000, created_at: new Date() };
    list.push(newBooking);
    memoryStore.bookings.set(userId, list);
    res.json(newBooking);
  }
});

// ==================== ROLE-AWARE UNIFIED AI CHAT ====================

app.post("/api/ai-chat", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const authHeader = req.headers.authorization;
    let userRole = 'STUDENT';
    let userId = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (getIsConnected()) {
        const sRes = await pool.query(
          `SELECT u.id, u.role FROM sessions s JOIN users u ON s.user_id = u.id WHERE s.token = $1 AND s.expires_at > NOW()`,
          [token]
        );
        if (sRes.rows.length > 0) {
          userRole = sRes.rows[0].role || 'STUDENT';
          userId = sRes.rows[0].id;
        }
      } else {
        for (const [uId, s] of memoryStore.sessions.entries()) {
          if (s.token === token && s.expires_at > new Date()) {
            const u = memoryStore.users.get(uId);
            if (u) {
              userRole = u.role || 'STUDENT';
              userId = uId;
            }
            break;
          }
        }
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      if (userRole === 'OWNER') {
        return res.json({
          reply: `UniStay Owner AI (Fallback): Based on your authorized properties, you have active rooms available. Regarding "${prompt}", please review your property status and pending enquiries in the Owner Dashboard.`
        });
      } else if (userRole === 'ADMIN') {
        return res.json({
          reply: `UniStay Admin AI (Fallback): System health is stable. Regarding "${prompt}", platform verification queue and audit logs are operating within normal parameters.`
        });
      } else {
        return res.json({
          reply: `UniStay Student AI (Fallback): Regarding "${prompt}", I recommend exploring verified Trust Passports, checking True Living Cost estimates, and scheduling your university stay.`
        });
      }
    }

    let systemPersona = "";
    if (userRole === 'OWNER') {
      systemPersona = `You are UniStay Owner AI, an expert AI Property Operations Manager for student housing in India. 
      Help the property owner track rooms, manage availability, review enquiries, handle maintenance, and optimize their listings. 
      Always maintain an operational, concise, data-driven tone. Never expose private student data or other owners' listings.`;
    } else if (userRole === 'ADMIN') {
      systemPersona = `You are UniStay Admin AI, an expert Platform Operations Assistant for UniStay. 
      Help the admin monitor platform health, review verification queues, inspect audit logs, and moderate listings.`;
    } else {
      systemPersona = `You are UniStay Student AI, an expert Personal Student Living Advisor for India. 
      Help the student find, compare, understand, plan, decide, and settle into verified student housing near their university. 
      Always maintain a warm, trustworthy, student-first tone. Never invent rent, availability, or reviews.`;
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPersona}
              Authenticated User Role: ${userRole}
              Context: ${context || 'General inquiry'}
              User Prompt: ${prompt}`
            }
          ]
        }
      ]
    });

    res.json({ reply: response.text || "UniStay AI is ready to assist you." });
  } catch (error: any) {
    console.error("AI Role-Aware Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", databaseConnected: getIsConnected() });
});

// Send OTP
app.post("/api/auth/send-otp", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ success: false, error: "Phone number is required." });
    }
    return res.json({ success: true, message: "OTP sent successfully. Use test code 123456." });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || "Failed to send OTP." });
  }
});

// Logout
app.post("/api/auth/logout", authenticateUser, async (req: any, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (getIsConnected()) {
        await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
      } else {
        for (const [uId, s] of memoryStore.sessions.entries()) {
          if (s.token === token) {
            memoryStore.sessions.delete(uId);
            break;
          }
        }
      }
    }
    return res.json({ success: true, message: "Logged out successfully." });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || "Logout failed." });
  }
});

// API 404 Fallback to guarantee JSON response instead of HTML
app.all("/api/*", (req, res) => {
  res.status(404).json({ success: false, error: `API endpoint ${req.method} ${req.originalUrl} not found.` });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UniStay master server running on http://localhost:${PORT}`);
  });
}

startServer();

export default app;
