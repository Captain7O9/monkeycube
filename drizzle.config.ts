import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({
	path: ['.env.local', '.env.production']
});

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',

	dbCredentials: {
		url: process.env.DATABASE_URL
	},

	verbose: true,
	strict: true,
	dialect: 'postgresql',
	casing: 'snake_case'
});
