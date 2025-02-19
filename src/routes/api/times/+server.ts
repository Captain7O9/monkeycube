import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { and, desc, eq, gt } from 'drizzle-orm';
import * as table from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ locals, url }) => {
	let userId = url.searchParams.get('user');
	const limit = Number(url.searchParams.get('limit'));
	const since = Number(url.searchParams.get('since'));

	if (!userId && !locals.user) {
		error(400, 'No user ID provided');
	} else if (!userId) {
		userId = locals.user!.id;
	}

	const times = await db
		.select()
		.from(table.time)
		.where(
			and(eq(table.time.userId, userId), since ? gt(table.time.date, new Date(since)) : undefined)
		)
		.orderBy(desc(table.time.date))
		.limit(limit);
	return json(times);
};

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const { time, scramble, event } = await request.json();
	const createdTime = await db.insert(table.time).values({
		userId: locals.user.id,
		time,
		scramble,
		event
	});

	return json(createdTime);
};
