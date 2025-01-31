import { user } from '$lib/stores/user.svelte.js';

export async function load() {
  user.set(await user.fetchUser());
}
