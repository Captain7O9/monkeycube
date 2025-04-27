import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { User } from '$lib/server/db/schema';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const PATCH: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) error(401, { message: 'Unauthorized' });

	const updateData: Partial<User> = await request.json();

	const patchedUser = await db
		.update(table.user)
		.set(updateData)
		.where(eq(table.user.id, locals.user.id));

	return json(patchedUser);
};
