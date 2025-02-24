import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
console.log(env.DATABASE_URL);

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { casing: 'snake_case' });

if (process.env.MIGRATE === 'true') await migrate(db, { migrationsFolder: './drizzle' });
