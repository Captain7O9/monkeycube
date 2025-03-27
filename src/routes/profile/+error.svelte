<script lang="ts">
	import { page } from '$app/state';
</script>

<h1><a href="/account">Log in</a> to view this page</h1>
{page.status}: {page.error?.message}

<style lang="scss">
	a {
		text-decoration: underline;
	}
</style>
