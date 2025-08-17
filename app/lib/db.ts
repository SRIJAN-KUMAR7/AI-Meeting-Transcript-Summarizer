import { Pool } from "pg";

let pool: Pool;

if (!(global as any).pgPool) {
  (global as any).pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
  });
}

pool = (global as any).pgPool;

export default pool;
