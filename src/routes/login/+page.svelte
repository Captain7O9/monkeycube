<script lang="ts">
	import { enhance } from '$app/forms';

	let loginType: 'login' | 'register' = $state('login');
</script>

<main>
	<form class="register" method="POST" action="?/login" use:enhance autocomplete="off">
		<button
			class:selected={loginType === 'login'}
			onclick={() => {
				loginType = 'login';
			}}
			form="none"><i class="fa-solid fa-user-check"></i>login</button
		>
		<button
			class:selected={loginType === 'register'}
			onclick={() => {
				loginType = 'register';
			}}
			form="none"><i class="fa-solid fa-user-plus"></i>register</button
		>
		<input name="username" placeholder="username" required />
		<input type="password" name="password" placeholder="password" required />
		{#if loginType === 'login'}
			<button class="action" formaction="?/login">login</button>
		{:else}
			<input type="password" name="repeat-password" placeholder="repeat password" required />
			<button class="action" formaction="?/register">register</button>
		{/if}
		<div class="separator">or use</div>
		<button
			form="none"
			class="provider"
			onclick={() => {
				window.location.href = '/login/github';
			}}><i class="fa-brands fa-github"></i>GitHub</button
		>
	</form>
</main>

<style>
	main {
		flex-grow: 1;
		margin: 10vh auto;
	}

	form {
		display: grid;
		grid-auto-rows: 1fr;
		grid-template-columns: 1fr 1fr;
		width: clamp(200px, 25vw, 1000px);
		gap: 4px;
	}

	button {
		flex: 1;
		padding: 10px;
		color: var(--text-color);
		background-color: var(--sub-alt-color);
		border-radius: var(--border-radius);

		&.selected {
			color: var(--sub-alt-color);
			background-color: var(--main-color);
		}

		i {
			padding-right: 0.3rem;
		}
	}

	input {
		font-size: 1rem;
		background-color: var(--sub-alt-color);
		border: solid 2px transparent;
		border-radius: calc(var(--border-radius) / 1.5);
		color: var(--text-color);
		grid-column: span 2;
		padding: 0 5px;

		&:focus {
			outline: none;
			border: solid 2px var(--main-color);
		}
	}

	.action {
		grid-column: span 2;
	}

	.provider {
		grid-column: span 2;
	}

	.action:hover,
	.provider:hover {
		color: var(--sub-alt-color);
		background-color: var(--text-color);
	}

	.separator {
		position: relative;
		grid-column: span 2;
		text-align: center;
		align-content: center;

		&::before {
			content: '';
			background-color: var(--sub-color);
			position: absolute;
			left: 0;
			bottom: 50%;
			transform: translateY(50%);
			width: calc(50% - 35px);
			height: 2px;
			border-radius: var(--border-radius);
		}

		&::after {
			content: '';
			background-color: var(--sub-color);
			position: absolute;
			right: 0;
			bottom: 50%;
			transform: translateY(50%);
			width: calc(50% - 35px);
			height: 2px;
			border-radius: var(--border-radius);
		}
	}
</style>
