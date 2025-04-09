<script lang="ts">
	import NavBarLogo from './NavBarLogo.svelte';

	let { username } = $props();
</script>

<div class="navbar-content constrain-width">
	<a href="/" class="logo lexend-deca"><NavBarLogo /></a>

	<a href="/" aria-label="home"><i class="fa-solid fa-clock"></i></a>
	<a href="/profile" aria-label="times"><i class="fa-solid fa-chart-simple"></i></a>
	<a href="/algs" aria-label="algorithms"><i class="fa-solid fa-list-ul"></i></a>
	<a href="/settings" aria-label="settings"><i class="fa-solid fa-cog"></i></a>
	<a href="/login" class="login">
		<div class="user">
			{#if username}
				<i class="fa-solid fa-user-circle"></i>
				<p>{username}</p>
			{:else}
				<i class="fa-solid fa-arrow-circle-right"></i>
				<p>Login</p>
			{/if}
		</div>
	</a>
</div>

<style>
	.navbar-content {
		display: flex;
		align-items: baseline;
		gap: 2rem;
	}

	.logo {
		font-size: 2.3em;
		color: var(--text-color);
	}

	.login {
		margin-left: auto;
	}

	a:hover {
		color: var(--text-color);
	}

	.user {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
