<script lang="ts">
	import { page } from '$app/state';
</script>

<h1><a href="/login?redirectTo=/profile">Log in</a> to view this page</h1>
{page.status}: {page.error?.message}

<style>
	a {
		text-decoration: underline;
	}
</style>
