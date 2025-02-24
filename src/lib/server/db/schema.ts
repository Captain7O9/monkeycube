import { boolean, json, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const user = pgTable('user', {
	id: text().primaryKey(),
	username: text().notNull().unique(),
	passwordHash: text().notNull(),
	theme: text().notNull().default('serika dark'),
	customTheme: json().default({
		'--background-color': '#323437',
		'--main-color': '#e2b714',
		'--sub-color': '#646669',
		'--sub-alt-color': '#2c2e31',
		'--text-color': '#d1d0c5',
		'--error-color': '#ca4754',
		'--white': '#fff',
		'--yellow': '#f7c331',
		'--green': '#2ecc71',
		'--blue': '#3498db',
		'--red': '#e74c3c',
		'--orange': '#f39c12'
	})
});

export const session = pgTable('session', {
	id: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const time = pgTable('times', {
	id: serial().primaryKey(), // Auto-incrementing ID
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	time: serial().notNull(), // Time in milliseconds
	date: timestamp('date', { withTimezone: true })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	isPlusTwo: boolean().notNull().default(false),
	isDNF: boolean().notNull().default(false),
	scramble: text().notNull(),
	event: text().notNull()
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Time = typeof time.$inferSelect;
