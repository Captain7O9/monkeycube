import { user } from '$lib/user.svelte';

export async function load() {
  user.set(await user.fetchUser());
}
