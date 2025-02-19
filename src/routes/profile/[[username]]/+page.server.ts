import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!params.username) {
		if (!locals.user?.username) {
			error(404, 'Not Found ');
		}
		redirect(302, `/profile/${locals.user.username}`);
	}

	return { username: params.username };
};
