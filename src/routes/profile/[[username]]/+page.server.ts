import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!params.username) {
		if (!locals.user?.username) {
			error(404, 'Not Found ');
		}
		redirect(302, `/profile/${locals.user.username}`);
	}

	const [response] = await db
		.select({ user: { id: table.user.id } })
		.from(table.user)
		.where(eq(table.user.username, params.username));

	const times = await db
		.select()
		.from(table.time)
		.where(eq(table.time.userId, response.user.id))
		.orderBy(desc(table.time.date));

	return { username: params.username, times: times };
};
