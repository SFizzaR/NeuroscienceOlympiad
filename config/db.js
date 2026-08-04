const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, // Serverless: keep it low (1-5)
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 10000,
});

module.exports = pool;