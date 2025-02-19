<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { form, data }: { form: ActionData; data: PageData } = $props();
</script>

<main class="constrain-width">
	<h1>Login/Register</h1>
	<form method="post" action="?/login" use:enhance>
		<label>
			Username
			<input name="username" />
		</label>
		<label>
			Password
			<input type="password" name="password" />
		</label>
		<button>Login</button>
		<button formaction="?/register">Register</button>
		<button formaction="?/logout">Logout</button>
	</form>
	<p style="color: red">{form?.message ?? ''}</p>

	{#if data.user}
		You are logged in as {data.user.username}
	{:else}
		You are not logged in
	{/if}
</main>
