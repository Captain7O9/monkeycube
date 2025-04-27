import { error, json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { and, desc, eq, lte } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals, params, url }) => {
	const user = locals.user;
	if (!user) error(401, { message: 'Unauthorized' });

	const of = Number(url.searchParams.get('of') ?? 1);
	if (!of) error(400, { message: 'No average size provided' });

	const [time] = await db
		.select()
		.from(table.time)
		.where(eq(table.time.id, Number(params.id)));

	if (!time) error(404, { message: 'Time not found' });

	const times = await db
		.select()
		.from(table.time)
		.where(and(eq(table.time.userId, user.id), lte(table.time.date, time.date)))
		.orderBy(desc(table.time.date))
		.limit(of);

	const sum = times.reduce((a, b) => a + b.time, 0);

	return json(sum / times.length);
};
