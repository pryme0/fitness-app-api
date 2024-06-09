import { Client } from 'pg';
// import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config(); // Load .env file

async function createDatabase() {
//   const configService = new ConfigService();
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  const dbName = process.env.DATABASE_NAME;

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName],
    );
    console.log({ res });

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
  } catch (error) {
    console.error('Error creating database', error);
  } finally {
    await client.end();
  }
}

createDatabase();
