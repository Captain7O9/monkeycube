import { user } from '$lib/stores/user.svelte.js';
import { error, redirect } from '@sveltejs/kit';

export const load = ({ params }) => {
  if (params.username) {
    return { username: params.username };
  } else if (user.username) {
    redirect(302, `/user/${user.username}`);
  } else {
    error(404, 'Not Found ');
  }
};
