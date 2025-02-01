import { user } from '$lib/user.svelte.js';

export async function load() {
  user.set(await user.fetchUser());
}
