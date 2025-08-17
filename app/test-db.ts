import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false, 
  },
});

async function testDB() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB Connected! Current time:", res.rows[0]);
  } catch (err) {
    console.error("❌ DB Connection failed:", err);
  } finally {
    await pool.end();
  }
}

testDB();
