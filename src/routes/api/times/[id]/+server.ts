import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import type { Time } from '$lib/server/db/schema';
import * as table from '$lib/server/db/schema';
import { error, json } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ params }) => {
	const [result] = await db
		.select()
		.from(table.time)
		.where(eq(table.time.id, Number(params.id)));

	if (!result) {
		error(404, 'Time not found');
	}

	return json(result);
};

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const [timeRequested] = await db
		.select({ userId: table.time.userId })
		.from(table.time)
		.where(eq(table.time.id, Number(params.id)));

	if (!timeRequested) {
		error(404, 'Time not found');
	}

	if (locals.user.id !== timeRequested.userId) {
		error(403, 'You do not have permission to edit this time');
	}

	const updateData: Partial<Time> = await request.json();

	const patchedTime = await db
		.update(table.time)
		.set(updateData)
		.where(eq(table.time.id, Number(params.id)));

	return json(patchedTime);
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const result = await db.delete(table.time).where(eq(table.time.id, Number(params.id)));
	if (result.rowsAffected === 0) {
		error(404, 'Time not found');
	}

	return json(result);
};
