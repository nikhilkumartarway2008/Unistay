import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// PostgreSQL Pool configuration
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connectionString || 'postgres://postgres:postgres@localhost:5432/unistay',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

let isConnected = false;

export async function initDb() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database (Cloud SQL compatible).');
    isConnected = true;
    
    // Read and execute schema
    const schemaPath = path.join(process.cwd(), 'server', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
      console.log('Database schema verified / initialized successfully.');
    }
    client.release();
  } catch (err: any) {
    console.warn('PostgreSQL connection warning:', err.message);
    console.warn('Running in resilient memory/hybrid mode or waiting for Cloud SQL configuration.');
  }
}

export function getIsConnected() {
  return isConnected;
}
