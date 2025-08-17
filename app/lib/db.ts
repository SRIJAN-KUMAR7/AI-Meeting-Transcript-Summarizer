import postgres from 'postgres';

declare global {
  var __db: postgres.Sql | undefined;
}

const db = global.__db || postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
});

if (process.env.NODE_ENV !== 'production') {
  global.__db = db;
}

export default db;
