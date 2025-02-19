import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const user = sqliteTable('user', {
	id: text().primaryKey(),
	username: text().notNull().unique(),
	passwordHash: text().notNull(),
	theme: text().default('serika dark'),
	customTheme: blob()
});

export const session = sqliteTable('session', {
	id: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const time = sqliteTable('times', {
	id: integer().primaryKey({ autoIncrement: true }),
	userId: text()
		.notNull()
		.references(() => user.id),
	time: integer().notNull(), // Time in ms
	date: integer({ mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(unixepoch() * 1000)`),
	isPlusTwo: integer({ mode: 'boolean' }).notNull().default(false),
	isDNF: integer({ mode: 'boolean' }).notNull().default(false),
	scramble: text().notNull(),
	event: text()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Time = typeof time.$inferSelect;
